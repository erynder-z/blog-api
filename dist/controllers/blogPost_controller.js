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
    post_1.default.find({})
        .sort({
        timestamp: -1,
    })
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
    const postLimit = 10;
    post_1.default.find({})
        .sort({ timestamp: -1 })
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
    post_1.default.find({})
        .sort({ msg_timestamp: -1 })
        .exec(function (err, list_posts) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            post_list: list_posts,
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
            tags: [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZ1Bvc3RfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2Jsb2dQb3N0X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQTJEO0FBQzNELGtEQUEwQjtBQUMxQiwwREFBa0Q7QUFDbEQsd0RBQWdDO0FBQ2hDLGdFQUF3QztBQUd4QyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pFLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ1YsSUFBSSxDQUFDO1FBQ0osU0FBUyxFQUFFLENBQUMsQ0FBQztLQUNkLENBQUM7U0FDRCxJQUFJLENBQUMsVUFBVSxHQUFrQixFQUFFLFVBQStCO1FBQ2pFLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQStPQSx3Q0FBYztBQTdPaEIsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzVFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixjQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNWLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3ZCLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDaEIsSUFBSSxDQUFDLFVBQVUsR0FBa0IsRUFBRSxVQUErQjtRQUNqRSxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FB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