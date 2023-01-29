"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_article = exports.deleteArticle = exports.createArticle = exports.showUnpublishedArticles = exports.showCertainArticle = exports.showLatestArticles = exports.showAllArticlesAdmin = exports.showAllArticles = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const article_1 = __importDefault(require("../models/article"));
const tag_1 = __importDefault(require("../models/tag"));
const showAllArticles = (req, res, next) => {
    const query = { isPublished: true };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    article_1.default.find(query, null, options).exec((err, listArticles) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            article_list: listArticles,
        });
    });
};
exports.showAllArticles = showAllArticles;
const showAllArticlesAdmin = (req, res, next) => {
    const query = {};
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    article_1.default.find(query, null, options).exec((err, listArticles) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            article_list: listArticles,
        });
    });
};
exports.showAllArticlesAdmin = showAllArticlesAdmin;
const showLatestArticles = (req, res, next) => {
    const articleLimit = 12;
    const query = { isPublished: true };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
        limit: articleLimit,
    };
    article_1.default.find(query, null, options).exec((err, listArticles) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            article_list: listArticles,
        });
    });
};
exports.showLatestArticles = showLatestArticles;
const showCertainArticle = (req, res, next) => {
    const id = req.params.id;
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    article_1.default.findById(id, null, options).exec((err, article) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            article: article,
        });
    });
};
exports.showCertainArticle = showCertainArticle;
const showUnpublishedArticles = (req, res, next) => {
    const query = { isPublished: false };
    const options = {
        sort: { timestamp: -1 },
        populate: [
            { path: 'author', select: 'username' },
            { path: 'comments' },
            { path: 'tags' },
        ],
    };
    article_1.default.find(query, null, options).exec((err, listArticles) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            article_list: listArticles,
        });
    });
};
exports.showUnpublishedArticles = showUnpublishedArticles;
const createArticle = [
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
    (0, express_validator_1.body)('content', 'Text must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('tags.*').escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const article = new article_1.default({
            author: req.user,
            title: req.body.title,
            content: req.body.content,
            timestamp: Date.now(),
            tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
            comments: [],
            isPublished: req.body.publishArticle === 'on' ? true : false,
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
                    if (article.tags.includes(tag._id)) {
                        tag.checked = 'true';
                    }
                }
                res.status(400).json({
                    title: 'Failed to save article!',
                    tags: results.tags,
                    errors: errors.array(),
                    article,
                });
            });
            return;
        }
        article.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Article saved successfully!',
                article,
            });
        });
    },
];
exports.createArticle = createArticle;
const deleteArticle = (req, res, next) => {
    article_1.default.findById(req.params.id).exec(function (err, result) {
        if (err) {
            return next(err);
        }
        article_1.default.findByIdAndRemove(result === null || result === void 0 ? void 0 : result._id, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ title: 'Article deleted!' });
        });
    });
};
exports.deleteArticle = deleteArticle;
const update_article = [
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
    (0, express_validator_1.body)('content', 'Text must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('tags.*').escape(),
    (0, express_validator_1.body)('comments.*').escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const article = new article_1.default({
            _id: req.params.id,
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
            timestamp: req.body.timestamp,
            tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
            comments: typeof req.body.comments === 'undefined' ? [] : req.body.comments,
            isPublished: req.body.isPublished === 'on' ? true : false,
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
                    if (article.tags.includes(tag._id)) {
                        tag.checked = 'true';
                    }
                }
                res.status(400).json({
                    title: 'Failed to update article!',
                    tags: results.tags,
                    comments: results.comments,
                    errors: errors.array(),
                    article,
                });
            });
            return;
        }
        article_1.default.findOneAndUpdate({ _id: req.params.id }, article, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Article updated successfully!',
                article,
            });
        });
    },
];
exports.update_article = update_article;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZV9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvYXJ0aWNsZV9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlEQUEyRDtBQUMzRCxrREFBMEI7QUFDMUIsZ0VBQTJEO0FBQzNELHdEQUFnQztBQUdoQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFFLE1BQU0sS0FBSyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ3ZCLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1lBQ3RDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7U0FDakI7S0FDRixDQUFDO0lBRUYsaUJBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3JDLENBQUMsR0FBa0IsRUFBRSxZQUFvQyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBcVNBLDBDQUFlO0FBblNqQixNQUFNLG9CQUFvQixHQUFHLENBQzNCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sS0FBSyxH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