"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blogPost = exports.delete_blogPost = exports.create_blogPost_post = exports.create_blogPost_get = exports.show_certain_post = exports.show_latest_posts = exports.show_all_posts = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const post_1 = __importDefault(require("../models/post"));
const tag_1 = __importDefault(require("../models/tag"));
const comment_1 = __importDefault(require("../models/comment"));
const show_all_posts = (req, res, next) => {
    post_1.default.find({ isPublished: true })
        .sort({
        timestamp: -1,
    })
        .populate('author', 'username')
        .populate('comments')
        .populate('tags')
        .exec(function (err, list_posts) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: list_posts,
        });
    });
};
exports.show_all_posts = show_all_posts;
const show_latest_posts = (req, res, next) => {
    const postLimit = 12;
    post_1.default.find({ isPublished: true })
        .sort({ timestamp: -1 })
        .populate('author', 'username')
        .populate('comments')
        .populate('tags')
        .limit(postLimit)
        .exec(function (err, list_posts) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: list_posts,
        });
    });
};
exports.show_latest_posts = show_latest_posts;
const show_certain_post = (req, res, next) => {
    post_1.default.findById(req.params.id)
        .sort({ timestamp: -1 })
        .populate('author', 'username')
        .populate('comments')
        .populate('tags')
        .exec(function (err, post) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post: post,
        });
    });
};
exports.show_certain_post = show_certain_post;
const create_blogPost_get = (req, res, next) => {
    async_1.default.parallel({
        tags(callback) {
            tag_1.default.find(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json({ tags: results.tags });
    });
};
exports.create_blogPost_get = create_blogPost_get;
const create_blogPost_post = [
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
            isPublished: false,
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
exports.create_blogPost_post = create_blogPost_post;
const delete_blogPost = (req, res, next) => {
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
exports.delete_blogPost = delete_blogPost;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZ1Bvc3RfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2Jsb2dQb3N0X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQTJEO0FBQzNELGtEQUEwQjtBQUMxQiwwREFBa0Q7QUFDbEQsd0RBQWdDO0FBQ2hDLGdFQUF3QztBQUd4QyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pFLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDN0IsSUFBSSxDQUFDO1FBQ0osU0FBUyxFQUFFLENBQUMsQ0FBQztLQUNkLENBQUM7U0FDRCxRQUFRLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztTQUM5QixRQUFRLENBQUMsVUFBVSxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDaEIsSUFBSSxDQUFDLFVBQVUsR0FBa0IsRUFBRSxVQUErQjtRQUNqRSxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsU0FBUyxFQUFFLFVBQVU7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFxUEEsd0NBQWM7QUFuUGhCLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM3QixJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FB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