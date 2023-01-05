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
    tag_1.default.find()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy90YWdfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBMkQ7QUFDM0Qsa0RBQTBCO0FBQzFCLDBEQUFrRDtBQUNsRCx3REFBK0M7QUFJL0MsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RSxhQUFHLENBQUMsSUFBSSxFQUFFO1NBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUM1QixJQUFJLENBQUMsVUFBVSxHQUFrQixFQUFFLFNBQTZCO1FBQy9ELElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixRQUFRLEVBQUUsU0FBUztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQWlKTyxzQ0FBYTtBQS9JdEIsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMxRSxlQUFLLENBQUMsUUFBUSxDQUNaO1FBQ0UsR0FBRyxDQUFDLFFBQVE7WUFDVixhQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxTQUFTLENBQUMsUUFBUTtZQUNoQixjQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQs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