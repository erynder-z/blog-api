"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blogPost_post = exports.update_blogPost_get = exports.delete_blogPost_post = exports.delete_blogPost_get = exports.create_blogPost_post = exports.create_blogPost_get = exports.show_blogPost_get = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const post_1 = __importDefault(require("../models/post"));
const tag_1 = __importDefault(require("../models/tag"));
const show_blogPost_get = (req, res) => {
    res.send('show blogpost get');
};
exports.show_blogPost_get = show_blogPost_get;
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
    (0, express_validator_1.body)('tag.*').escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const post = new post_1.default({
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
                res.json({
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
            res.json({
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
const delete_blogPost_post = (req, res) => {
    res.send('delete blogpost post');
};
exports.delete_blogPost_post = delete_blogPost_post;
const update_blogPost_get = (req, res) => {
    res.send('delete blogpost get');
};
exports.update_blogPost_get = update_blogPost_get;
const update_blogPost_post = (req, res) => {
    res.send('delete blogpost post');
};
exports.update_blogPost_post = update_blogPost_post;
