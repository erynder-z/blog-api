"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_article = exports.deleteArticle = exports.createArticle = exports.showUnpublishedArticles = exports.getRandomArticleId = exports.showCertainArticle = exports.showLatestArticles = exports.showAllArticlesAdmin = exports.showAllArticles = void 0;
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
            return next();
        }
        if (!listArticles) {
            res.status(404).json({ message: 'No articles found' });
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
            return next();
        }
        if (!listArticles) {
            res.status(404).json({ message: 'No articles found' });
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
            return next();
        }
        if (!listArticles) {
            res.status(404).json({ message: 'No articles found' });
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
            return next();
        }
        if (!article) {
            res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({
            article: article,
        });
    });
};
exports.showCertainArticle = showCertainArticle;
const getRandomArticleId = (req, res, next) => {
    article_1.default.aggregate([
        { $match: { isPublished: true } },
        { $sample: { size: 1 } },
    ]).exec((err, article) => {
        if (err) {
            return next(err);
        }
        if (!article.length) {
            return res.status(404).json({ message: 'No published article found' });
        }
        return res.status(200).json({
            articleId: article[0]._id,
        });
    });
};
exports.getRandomArticleId = getRandomArticleId;
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
            return next();
        }
        if (!listArticles) {
            res.status(404).json({ message: 'No articles found' });
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
            isPublished: req.body.isPublished,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZV9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvYXJ0aWNsZV9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlEQUEyRDtBQUMzRCxrREFBMEI7QUFDMUIsZ0VBQTJEO0FBQzNELHdEQUFnQztBQUdoQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFFLE1BQU0sS0FBSyxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ3ZCLFFBQVEsRUFBRTtZQUNSLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1lBQ3RDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7U0FDakI7S0FDRixDQUFDO0lBRUYsaUJBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3JDLENBQUMsR0FBa0IsRUFBRSxZQUFvQyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FDRixDQUFDO0FB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