"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_tag = exports.delete_tag = exports.create_tag = exports.show_tag_detail = exports.show_all_tags = void 0;
const express_validator_1 = require("express-validator");
const async_1 = __importDefault(require("async"));
const post_1 = __importDefault(require("../models/post"));
const tag_1 = __importDefault(require("../models/tag"));
const show_all_tags = (req, res, next) => {
    tag_1.default.find({})
        .sort([['tag', 'ascending']])
        .exec(function (err, list_tags) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            tag_list: list_tags,
        });
    });
};
exports.show_all_tags = show_all_tags;
const show_tag_detail = (req, res, next) => {
    async_1.default.parallel({
        tag(callback) {
            tag_1.default.findById(req.params.id).exec(callback);
        },
        tag_posts(callback) {
            post_1.default.find({ tag: req.params.id }).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.tag == null) {
            res.status(404).json({ message: 'Tag not found' });
            return next(err);
        }
        res.status(200).json({
            title: `Posts tagged with ${results.tag}`,
            tag: results.tag,
            tag_posts: results.tag_posts,
        });
    });
};
exports.show_tag_detail = show_tag_detail;
const create_tag = [
    (0, express_validator_1.body)('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const tag = new tag_1.default({ name: req.body.tagName });
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Could not create tag.',
                tag,
                errors: errors.array(),
            });
            return;
        }
        else {
            tag_1.default.findOne({ name: req.body.tagName }).exec((err, found_tag) => {
                if (err) {
                    return next(err);
                }
                if (found_tag) {
                    res.redirect(`${found_tag.url}`);
                }
                else {
                    tag.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json({
                            title: 'Tag saved successfully!',
                            tag,
                        });
                    });
                }
            });
        }
    },
];
exports.create_tag = create_tag;
const delete_tag = (req, res, next) => {
    async_1.default.parallel({
        tag(callback) {
            tag_1.default.findById(req.body.tagid).exec(callback);
        },
        tag_posts(callback) {
            post_1.default.find({ genre: req.body.genreid }).exec(callback);
        },
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.tag_posts.length > 0) {
            res.status(400).json({});
            res.status(400).json({
                title: `Unable to delete! Posts tagged with ${results.tag}`,
                tag: results.tag,
                tag_posts: results.tag_posts,
            });
            return;
        }
        tag_1.default.findByIdAndRemove(req.body.tagid, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ title: 'Tag deleted!' });
        });
    });
};
exports.delete_tag = delete_tag;
const update_tag = [
    (0, express_validator_1.body)('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const tag = new tag_1.default({
            name: req.body.tagName,
            _id: req.params.id,
        });
        if (!errors.isEmpty()) {
            res.status(400).json({
                title: 'Failed to update tag!',
                errors: errors.array(),
                tag,
            });
            return;
        }
        tag_1.default.findByIdAndUpdate(req.params.id, tag, {}, (err, theTag) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Tag updated successfully!',
                tag,
            });
        });
    },
];
exports.update_tag = update_tag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy90YWdfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBMkQ7QUFDM0Qsa0RBQTBCO0FBQzFCLDBEQUFrRDtBQUNsRCx3REFBK0M7QUFJL0MsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RSxhQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNULElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDNUIsSUFBSSxDQUFDLFVBQVUsR0FBa0IsRUFBRSxTQUE2QjtRQUMvRCxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFpSk8sc0NBQWE7QUEvSXRCLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDMUUsZUFBSyxDQUFDLFFBQVEsQ0FDWjtRQUNFLEdBQUcsQ0FBQyxRQUFRO1lBQ1YsYUFBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsU0FBUyxDQUFDLFFBQVE7WUFDaEIsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxD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