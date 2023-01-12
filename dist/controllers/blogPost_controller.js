"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blogPost = exports.deleteBlogpost = exports.createBlogpostPost = exports.showUnpublishedPosts = exports.showCertainPost = exports.showLatestPosts = exports.showAllPostsAdmin = exports.showAllPosts = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const post_1 = __importDefault(require("../models/post"));
const tag_1 = __importDefault(require("../models/tag"));
const comment_1 = __importDefault(require("../models/comment"));
const showAllPosts = (req, res, next) => {
    const query = { isPublished: true };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    post_1.default.find(query, null, options).exec((err, listPosts) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: listPosts,
        });
    });
};
exports.showAllPosts = showAllPosts;
const showAllPostsAdmin = (req, res, next) => {
    const query = {};
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    post_1.default.find(query, null, options).exec((err, listPosts) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: listPosts,
        });
    });
};
exports.showAllPostsAdmin = showAllPostsAdmin;
const showLatestPosts = (req, res, next) => {
    const postLimit = 12;
    const query = { isPublished: true };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
        limit: postLimit,
    };
    post_1.default.find(query, null, options).exec((err, listPosts) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: listPosts,
        });
    });
};
exports.showLatestPosts = showLatestPosts;
const showCertainPost = (req, res, next) => {
    const id = req.params.id;
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    post_1.default.findById(id, null, options).exec((err, post) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post: post,
        });
    });
};
exports.showCertainPost = showCertainPost;
const showUnpublishedPosts = (req, res, next) => {
    const query = { isPublished: false };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    post_1.default.find(query, null, options).exec((err, listPosts) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: listPosts,
        });
    });
};
exports.showUnpublishedPosts = showUnpublishedPosts;
const createBlogpostPost = [
    (req, res, next) => {
        if (!Array.isArray(req.body.tag)) {
            req.body.tag = typeof req.body.tag === 'undefined' ? [] : [req.body.tag];
        }
        next();
    },
    (0, express_validator_1.body)('title', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('tags.*').escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const post = new post_1.default({
            author: req.user,
            title: req.body.title,
            text: req.body.text,
            timestamp: Date.now(),
            tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
            comments: [],
            isPublished: req.body.publishPost === 'on' ? true : false,
        });
        if (!errors.isEmpty()) {
            async_1.default.parallel({
                tags(callback) {
                    tag_1.default.find(callback);
                },
            }, (err, results) => {
                if (err) {
                    return next(err);
                }
                for (const tag of results.tags) {
                    if (post.tags.includes(tag._id)) {
                        tag.checked = 'true';
                    }
                }
                res.status(400).json({
                    title: 'Failed to save post!',
                    tags: results.tags,
                    errors: errors.array(),
                    post,
                });
            });
            return;
        }
        post.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Post saved successfully!',
                post,
            });
        });
    },
];
exports.createBlogpostPost = createBlogpostPost;
const deleteBlogpost = (req, res, next) => {
    post_1.default.findById(req.params.id).exec(function (err, result) {
        if (err) {
            return next(err);
        }
        post_1.default.findByIdAndRemove(result === null || result === void 0 ? void 0 : result._id, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ title: 'Post deleted!' });
        });
    });
};
exports.deleteBlogpost = deleteBlogpost;
const update_blogPost = [
    (req, res, next) => {
        if (!Array.isArray(req.body.tags)) {
            req.body.tags =
                typeof req.body.tags === 'undefined' ? [] : [req.body.tags];
        }
        next();
    },
    (req, res, next) => {
        if (!Array.isArray(req.body.comments)) {
            req.body.comments =
                typeof req.body.comments === 'undefined' ? [] : [req.body.comments];
        }
        next();
    },
    (0, express_validator_1.body)('title', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (0, express_validator_1.body)('tags.*').escape(),
    (0, express_validator_1.body)('comments.*').escape(),
    (req, res, next) => {
        var _a, _b;
        const errors = (0, express_validator_1.validationResult)(req);
        const post = new post_1.default({
            _id: req.params.id,
            author: req.body.author,
            title: req.body.title,
            text: req.body.text,
            timestamp: req.body.timestamp,
            image: {
                data: (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer,
                contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            },
            tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
            comments: typeof req.body.comments === 'undefined' ? [] : req.body.comments,
            isPublished: req.body.isPublished,
        });
        if (!errors.isEmpty()) {
            async_1.default.parallel({
                tags(callback) {
                    tag_1.default.find(callback);
                },
                comments(callback) {
                    comment_1.default.find(callback);
                },
            }, (err, results) => {
                if (err) {
                    return next(err);
                }
                for (const tag of results.tags) {
                    if (post.tags.includes(tag._id)) {
                        tag.checked = 'true';
                    }
                }
                for (const comment of results.comments) {
                    if (post.comments.includes(comment._id)) {
                        comment.checked = 'true';
                    }
                }
                res.status(400).json({
                    title: 'Failed to update post!',
                    tags: results.tags,
                    comments: results.comments,
                    errors: errors.array(),
                    post,
                });
            });
            return;
        }
        post_1.default.findByIdAndUpdate(req.params.id, post, {}, (err, thePost) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Post updated successfully!',
                post,
            });
        });
    },
];
exports.update_blogPost = update_blogPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZ1Bvc3RfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2Jsb2dQb3N0X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQTJEO0FBQzNELGtEQUEwQjtBQUMxQiwwREFBa0Q7QUFDbEQsd0RBQWdDO0FBQ2hDLGdFQUF3QztBQUd4QyxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sS0FBSyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ3ZCLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1lBQ3RDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7U0FDakI7S0FDRixDQUFDO0lBRUYsY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDbEMsQ0FBQyxHQUFrQixFQUFFLFNBQThCLEVBQUUsRUFBRTtRQUNyRCxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUNGLENBQUM7QUFDSixDQUFDLENBQUM7QUFrU0Esb0NBQVk7QUFoU2QsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzVF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