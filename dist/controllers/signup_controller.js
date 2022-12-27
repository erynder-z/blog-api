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
exports.signup_post = void 0;
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = require("express-validator");
const author_1 = __importDefault(require("../models/author"));
const signup_post = [
    (0, express_validator_1.body)('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom((username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const alreadyExistingUsername = yield author_1.default.findOne({
                username: username,
            });
            if (alreadyExistingUsername) {
                throw new Error('Username already in use');
            }
        }
        catch (err) {
            throw new Error('Something went wrong when validating username');
        }
    })),
    (0, express_validator_1.body)('password', 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.')
        .trim()
        .isStrongPassword()
        .escape(),
    (0, express_validator_1.body)('confirmPassword', 'Passwords do not match.').custom((value, { req }) => value === req.body.password),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        passport_1.default.authenticate('signup', { session: false }, (err, user, info) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({
                    username: req.body.username,
                    errors: errors.array(),
                });
            }
            if (err) {
                return next(err);
            }
            res.json({
                message: 'Signed-up sucessfuly! Please log in to post!',
                user: req.user,
            });
        })(req, res, next);
    }),
];
exports.signup_post = signup_post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3REFBZ0M7QUFDaEMseURBQTJEO0FBQzNELDhEQUFzQztBQUV0QyxNQUFNLFdBQVcsR0FBRztJQUNsQixJQUFBLHdCQUFJLEVBQUMsVUFBVSxFQUFFLDZCQUE2QixDQUFDO1NBQzVDLElBQUksRUFBRTtTQUNOLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNwQixNQUFNLEVBQUU7U0FDUixNQUFNLENBQUMsQ0FBTyxRQUFnQixFQUFFLEVBQUU7UUFDakMsSUFBSTtZQUNGLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbkQsUUFBUSxFQUFFLFFBQVE7YUFDbkIsQ0FBQyxDQUFDO1lBRUgsSUFBSSx1QkFBdUIsRUFBRTtnQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUMsQ0FBQSxDQUFDO0lBQ0osSUFBQSx3QkFBSSxFQUNGLFVBQVUsRUFDViw4SEFBOEgsQ0FDL0g7U0FDRSxJQUFJLEVBQUU7U0FDTixnQkFBZ0IsRUFBRTtTQUNsQixNQUFNLEVBQUU7SUFDWCxJQUFBLHdCQUFJLEVBQUMsaUJBQWlCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxNQUFNLENBQ3ZELENBQUMsS0FBYSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDeEQ7SUFDRCxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsa0JBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN0RSxNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3JCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO29CQUMzQixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtpQkFDdkIsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLDhDQUE4QztnQkFDdkQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUE7Q0FDRixDQUFDO0FBRU8sa0NBQVcifQ==