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
const signup_post = [
    (0, express_validator_1.body)('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // TODO: Add custom validator to prevent dupe usernames.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3REFBZ0M7QUFDaEMseURBQTJEO0FBRTNELE1BQU0sV0FBVyxHQUFHO0lBQ2xCLElBQUEsd0JBQUksRUFBQyxVQUFVLEVBQUUsNkJBQTZCLENBQUM7U0FDNUMsSUFBSSxFQUFFO1NBQ04sUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtJQUNYLHdEQUF3RDtJQUN4RCxJQUFBLHdCQUFJLEVBQ0YsVUFBVSxFQUNWLDhIQUE4SCxDQUMvSDtTQUNFLElBQUksRUFBRTtTQUNOLGdCQUFnQixFQUFFO1NBQ2xCLE1BQU0sRUFBRTtJQUNYLElBQUEsd0JBQUksRUFBQyxpQkFBaUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FDdkQsQ0FBQyxLQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUN4RDtJQUNELENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQ0FBZ0IsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxrQkFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNkLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7b0JBQzNCLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO2lCQUN2QixDQUFDLENBQUM7YUFDSjtZQUNELElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUCxPQUFPLEVBQUUsOENBQThDO2dCQUN2RCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQTtDQUNGLENBQUM7QUFFTyxrQ0FBVyJ9