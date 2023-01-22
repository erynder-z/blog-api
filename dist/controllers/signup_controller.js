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
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = require("express-validator");
const author_1 = __importDefault(require("../models/author"));
const validateSignup = [
    (0, express_validator_1.body)('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom((username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!/^[a-zA-Z0-9-]+$/.test(username)) {
                throw new Error('Username must be alphanumeric and can contain hyphens.');
            }
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
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    next();
};
const handleSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        res.json({
            message: 'Signed-up sucessfuly! Please log in to post!',
            user: req.user,
        });
    })(req, res, next);
});
const signup = [...validateSignup, handleValidationErrors, handleSignup];
exports.default = signup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFnQztBQUNoQyx5REFBMkQ7QUFDM0QsOERBQXNDO0FBRXRDLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUEsd0JBQUksRUFBQyxVQUFVLEVBQUUsNkJBQTZCLENBQUM7U0FDNUMsSUFBSSxFQUFFO1NBQ04sUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtTQUNSLE1BQU0sQ0FBQyxDQUFPLFFBQWdCLEVBQUUsRUFBRTtRQUNqQyxJQUFJO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDYix3REFBd0QsQ0FDekQsQ0FBQzthQUNIO1lBQ0QsTUFBTSx1QkFBdUIsR0FBRyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNuRCxRQUFRLEVBQUUsUUFBUTthQUNuQixDQUFDLENBQUM7WUFFSCxJQUFJLHVCQUF1QixFQUFFO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7U0FDRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQyxDQUFBLENBQUM7SUFDSixJQUFBLHdCQUFJLEVBQ0YsVUFBVSxFQUNWLDhIQUE4SCxDQUMvSDtTQUNFLElBQUksRUFBRTtTQUNOLGdCQUFnQixFQUFFO1NBQ2xCLE1BQU0sRUFBRTtJQUNYLElBQUEsd0JBQUksRUFBQyxpQkFBaUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FDdkQsQ0FBQyxLQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUN4RDtDQUNGLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHLENBQzdCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO1NBQ3ZCLENBQUMsQ0FBQztLQUNKO0lBQ0QsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUNuQixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixrQkFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3RFLElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1AsT0FBTyxFQUFFLDhDQUE4QztZQUN2RCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUV6RSxrQkFBZSxNQUFNLENBQUMifQ==