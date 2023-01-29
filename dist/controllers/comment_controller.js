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
exports.deleteComment = exports.createComment = void 0;
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const article_1 = __importDefault(require("../models/article"));
const bad_words_1 = __importDefault(require("bad-words"));
const filter = new bad_words_1.default();
filter.addWords(...require('badwords/array'));
function saveComment(parentArticleId, commentData) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield article_1.default.findById(parentArticleId);
        if (!post) {
            throw new Error('Article not found');
        }
        const comment = new comment_1.default({
            parentArticle: parentArticleId,
            author: filter.clean(commentData.author),
            text: filter.clean(commentData.text),
            timestamp: Date.now(),
        });
        yield comment.save();
        post.comments.push(comment._id);
        yield post.save();
        return { comment, post };
    });
}
const createComment = [
    (0, express_validator_1.body)('author', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Failed to save comment!',
                errors: errors.array(),
            });
        }
        try {
            const { comment, post } = yield saveComment(req.params.id, req.body);
            res.status(200).json({
                title: 'Comment saved successfully!',
                comment,
                post,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.createComment = createComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.default.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ title: 'Comment not found' });
        }
        yield comment_1.default.findByIdAndRemove(comment._id);
        yield article_1.default.findByIdAndUpdate(comment.parentArticle, {
            $pull: { comments: comment._id },
        });
        res.status(200).json({ title: 'Comment deleted!' });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvY29tbWVudF9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUEyRDtBQUMzRCxnRUFBd0M7QUFDeEMsZ0VBQXdDO0FBQ3hDLDBEQUErQjtBQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFNLEVBQUUsQ0FBQztBQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUU5QyxTQUFlLFdBQVcsQ0FBQyxlQUF1QixFQUFFLFdBQWdCOztRQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLGlCQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUM7WUFDMUIsYUFBYSxFQUFFLGVBQWU7WUFDOUIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUN4QyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1NBQ3RCLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FBQTtBQUVELE1B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