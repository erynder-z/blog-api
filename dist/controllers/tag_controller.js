"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTag = exports.deleteTag = exports.createTag = exports.showTagDetail = exports.showAllTags = void 0;
const express_validator_1 = require("express-validator");
const article_1 = __importDefault(require("../models/article"));
const tag_1 = __importDefault(require("../models/tag"));
const showAllTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listTags = yield tag_1.default.find({}).sort('tag');
        res.status(200).json({
            tag_list: listTags,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.showAllTags = showAllTags;
const showTagDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield tag_1.default.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        const tagArticles = yield article_1.default.find({ tag: req.params.id });
        res.status(200).json({
            title: `Articles tagged with ${tag.name}`,
            tag,
            tag_posts: tagArticles,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.showTagDetail = showTagDetail;
const createTag = [
    (0, express_validator_1.body)('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Could not create tag.',
                errors: errors.array(),
            });
        }
        let tag = yield tag_1.default.findOne({ name: req.body.tagName });
        if (tag) {
            return res.redirect(`${tag.url}`);
        }
        tag = new tag_1.default({ name: req.body.tagName });
        try {
            yield tag.save();
            res.status(200).json({
                title: 'Tag saved successfully!',
                tag,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.createTag = createTag;
const deleteTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield tag_1.default.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ title: 'Tag not found' });
        }
        yield tag_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({ title: 'Tag deleted!' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTag = deleteTag;
const updateTag = [
    (0, express_validator_1.body)('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Failed to update tag!',
                errors: errors.array(),
            });
        }
        const tag = yield tag_1.default.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ title: 'Tag not found' });
        }
        tag.name = req.body.tagName;
        try {
            yield tag.save();
            res.status(200).json({
                title: 'Tag updated successfully!',
                tag,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.updateTag = updateTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy90YWdfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBMkQ7QUFFM0QsZ0VBQTJEO0FBQzNELHdEQUErQztBQUkvQyxNQUFNLFdBQVcsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzVFLElBQUk7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDWDtBQUNILENBQUMsQ0FBQSxDQUFDO0FBaUdPLGtDQUFXO0FBL0ZwQixNQUFNLGFBQWEsR0FBRyxDQUNwQixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0saUJBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FB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