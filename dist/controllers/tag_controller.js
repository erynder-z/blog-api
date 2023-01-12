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
const post_1 = __importDefault(require("../models/post"));
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
        const tagPosts = yield post_1.default.find({ tag: req.params.id });
        res.status(200).json({
            title: `Posts tagged with ${tag.name}`,
            tag,
            tag_posts: tagPosts,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy90YWdfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBMkQ7QUFFM0QsMERBQWtEO0FBQ2xELHdEQUErQztBQUkvQyxNQUFNLFdBQVcsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzVFLElBQUk7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDWDtBQUNILENBQUMsQ0FBQSxDQUFDO0FBaUdPLGtDQUFXO0FBL0ZwQixNQUFNLGFBQWEsR0FBRyxDQUNwQixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFD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