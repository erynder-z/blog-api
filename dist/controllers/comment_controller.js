"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_comment = exports.delete_comment = exports.create_comment = void 0;
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const post_1 = __importDefault(require("../models/post"));
const create_comment = [
    (0, express_validator_1.body)('author', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const parentPostId = req.params.id;
        const comment = new comment_1.default({
            parentPost: parentPostId,
            author: req.body.author,
            text: req.body.text,
            timestamp: Date.now(),
        });
        if (!errors.isEmpty()) {
            res.status(400).json({
                title: 'Failed to save comment!',
                errors: errors.array(),
                comment,
            });
            return;
        }
        comment.save((err) => {
            if (err) {
                return next(err);
            }
            post_1.default.findByIdAndUpdate(parentPostId, { $push: { comments: comment._id } }, (err, post) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    title: 'Comment saved successfully!',
                    comment,
                    post,
                });
            });
        });
    },
];
exports.create_comment = create_comment;
const delete_comment = (req, res, next) => {
    comment_1.default.findById(req.params.id).exec((err, result) => {
        if (err) {
            return next(err);
        }
        const parentPostId = result === null || result === void 0 ? void 0 : result.parentPost;
        comment_1.default.findByIdAndRemove(result === null || result === void 0 ? void 0 : result._id, (err) => {
            if (err) {
                return next(err);
            }
            post_1.default.findByIdAndUpdate(parentPostId, { $pull: { comments: result === null || result === void 0 ? void 0 : result._id } }, (err, post) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({ title: 'Comment deleted!' });
            });
        });
    });
};
exports.delete_comment = delete_comment;
const edit_comment = [
    (0, express_validator_1.body)('author', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        const parentPostId = req.params.id;
        const comment = new comment_1.default({
            _id: req.params.id,
            parentPost: parentPostId,
            author: req.body.author,
            text: req.body.text,
            timestamp: Date.now(),
        });
        if (!errors.isEmpty()) {
            res.status(400).json({
                title: 'Failed to edit comment!',
                errors: errors.array(),
                comment,
            });
            return;
        }
        comment_1.default.findByIdAndUpdate(req.params.id, comment, {}, (err, theComment) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                title: 'Comment edited successfully!',
                comment,
            });
        });
    },
];
exports.edit_comment = edit_comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvY29tbWVudF9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlEQUEyRDtBQUUzRCxnRUFBMkQ7QUFDM0QsMERBQWtEO0FBRWxELE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUEsd0JBQUksRUFBQyxRQUFRLEVBQUUsNkJBQTZCLENBQUM7U0FDMUMsSUFBSSxFQUFFO1NBQ04sUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtJQUNYLElBQUEsd0JBQUksRUFBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFFNUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQztZQUMxQixVQUFVLEVBQUUsWUFBWTtZQUN4QixNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLE9BQU87YUFDUixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1I7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7WUFFRCxjQUFJLENBQUMsaUJBQWlCLENBQ3BCLFlBQVksRUFDWixFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFDcEMsQ0FBQyxHQUFrQixFQUFFLElBQXVCLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xCO2dCQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNuQixLQUFLLEVBQUUsNkJBQTZCO29CQUNwQyxPQUFPO29CQUNQLElBQUk7aUJBQ0wsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDO0FBOEVPLHdDQUFjO0FBNUV2QixNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pFLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNsQyxDQUFDLEdBQWtCLEVBQUUsTUFBNEIsRUFBRSxFQUFFO1FBQ25ELElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsVUFBVSxDQUFDO1FBRXhDLGlCQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsRUFBRSxDQUFDLEdBQWtCLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtZQUVELGNBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsWUFBWSxFQUNaLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUNwQyxDQUFDLEdBQWtCLEVBQUUsSUFBdUIsRUFBRSxFQUFFO2dCQUM5QyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWlEdUIsd0NBQWM7QUEvQ3ZDLE1BQU0sWUFBWSxHQUFHO0lBQ25CLElBQUEsd0JBQUksRUFBQyxRQUFRLEVBQUUsNkJBQTZCLENBQUM7U0FDMUMsSUFBSSxFQUFFO1NBQ04sUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtJQUNYLElBQUEsd0JBQUksRUFBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFFNUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixLQUFLLEVBQUUseUJBQXlCO2dCQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDdEIsT0FBTzthQUNSLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUVELGlCQUFPLENBQUMsaUJBQWlCLENBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUNiLE9BQU8sRUFDUCxFQUFFLEVBQ0YsQ0FBQyxHQUFrQixFQUFFLFVBQWdDLEVBQUUsRUFBRTtZQUN2RCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixLQUFLLEVBQUUsOEJBQThCO2dCQUNyQyxPQUFPO2FBQ1IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUV1QyxvQ0FBWSJ9