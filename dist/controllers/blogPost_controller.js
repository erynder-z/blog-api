"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blogPost_put = exports.update_blogPost_get = exports.delete_blogPost_post = exports.delete_blogPost_get = exports.create_blogPost_post = exports.create_blogPost_get = exports.show_certain_post_get = exports.show_latest_posts_get = exports.show_all_posts_get = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const post_1 = __importDefault(require("../models/post"));
const tag_1 = __importDefault(require("../models/tag"));
const comment_1 = __importDefault(require("../models/comment"));
const show_all_posts_get = (req, res, next) => {
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
exports.show_all_posts_get = show_all_posts_get;
const show_latest_posts_get = (req, res, next) => {
    const postLimit = 10;
    post_1.default.find({})
        .sort({ msg_timestamp: -1 })
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
exports.show_latest_posts_get = show_latest_posts_get;
const show_certain_post_get = (req, res, next) => {
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
exports.show_certain_post_get = show_certain_post_get;
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
const delete_blogPost_get = (req, res) => {
    res.send('delete blogpost get');
};
exports.delete_blogPost_get = delete_blogPost_get;
const delete_blogPost_post = (req, res, next) => {
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
exports.delete_blogPost_post = delete_blogPost_post;
const update_blogPost_get = (req, res) => {
    res.send('delete blogpost get');
};
exports.update_blogPost_get = update_blogPost_get;
const update_blogPost_put = [
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
exports.update_blogPost_put = update_blogPost_put;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZ1Bvc3RfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2Jsb2dQb3N0X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQTJEO0FBQzNELGtEQUEwQjtBQUMxQiwwREFBa0Q7QUFDbEQsd0RBQWdDO0FBQ2hDLGdFQUF3QztBQUd4QyxNQUFNLGtCQUFrQixHQUFHLENBQ3pCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ1YsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLFVBQVU7UUFDN0IsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFNBQVMsRUFBRSxVQUFVO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBbVFBLGdEQUFrQjtBQWpRcEIsTUFBTSxxQkFBcUIsR0FBRyxDQUM1QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDVixJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMzQixLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxVQUFVO1FBQzdCLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7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