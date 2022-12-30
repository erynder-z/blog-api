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
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const author_1 = __importDefault(require("./models/author"));
const initializePassport = () => {
    // Use the JWT strategy to authenticate users based on a JWT
    passport_1.default.use(new passport_jwt_1.Strategy({
        // Verify the JWT using the TOKEN_SECRET_KEY environment variable
        secretOrKey: process.env.TOKEN_SECRET_KEY,
        // Extract the JWT from the request's Authorization header as a Bearer token
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // If the JWT is valid, return the user
            return done(null, token.user);
        }
        catch (error) {
            // If an error occurs, log the error and return it
            console.log(error);
            return done(error);
        }
    })));
    // Use the login strategy to authenticate users based on a username and password
    passport_1.default.use('login', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Find the user with the provided username
            const user = yield author_1.default.findOne({ username });
            if (!user) {
                // If no user is found, return a message
                return done(null, false, { message: 'User not found' });
            }
            // Compare the provided password to the user's stored password
            const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatches) {
                // If the passwords don't match, return a message
                return done(null, false, { message: 'invalid credentials!' });
            }
            // If the passwords match, return the user and a message
            return done(null, user, { message: 'Logged in successfully!' });
        }
        catch (error) {
            // If an error occurs, log the error and return it
            console.log(error);
            return done(error);
        }
    })));
    // Use the signup strategy to create new users
    passport_1.default.use('signup', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Hash the user's password
            bcrypt_1.default.hash(password, 10, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    // If an error occurs during password hashing, return a message
                    return done(null, false, { message: 'Error processing password!' });
                }
                // Store the hashed password in the database
                password = hashedPassword;
                // Create the user
                const user = yield author_1.default.create({ username, password });
                // Return the user
                return done(null, user);
            }));
        }
        catch (error) {
            // If an error occurs, log the error and return it
            console.log(error);
            return done(error);
        }
    })));
};
exports.initializePassport = initializePassport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcGFzc3BvcnQtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxtREFBMkQ7QUFDM0QsK0NBQW1FO0FBQ25FLG9EQUE0QjtBQUM1Qiw2REFBcUM7QUFFOUIsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDckMsNERBQTREO0lBQzVELGtCQUFRLENBQUMsR0FBRyxDQUNWLElBQUksdUJBQVcsQ0FDYjtRQUNFLGlFQUFpRTtRQUNqRSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7UUFDekMsNEVBQTRFO1FBQzVFLGNBQWMsRUFBRSx5QkFBVSxDQUFDLDJCQUEyQixFQUFFO0tBQ3pELEVBQ0QsQ0FBTyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEIsSUFBSTtZQUNGLHVDQUF1QztZQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxrREFBa0Q7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUMsQ0FBQSxDQUNGLENBQ0YsQ0FBQztJQUVGLGdGQUFnRjtJQUNoRixrQkFBUSxDQUFDLEdBQUcsQ0FDVixPQUFPLEVBQ1AsSUFBSSx5QkFBYSxDQUFDLENBQU8sUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNuRCxJQUFJO1lBQ0YsMkNBQTJDO1lBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRWhELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1Qsd0NBQXdDO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQzthQUN6RDtZQUVELDhEQUE4RDtZQUM5RCxNQUFNLGVBQWUsR0FBRyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEIsaURBQWlEO2dCQUNqRCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQzthQUMvRDtZQUVELHdEQUF3RDtZQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztTQUNqRTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsa0RBQWtEO1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7SUFFRiw4Q0FBOEM7SUFDOUMsa0JBQVEsQ0FBQyxHQUFHLENBQ1YsUUFBUSxFQUNSLElBQUkseUJBQWEsQ0FBQyxDQUFPLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDbkQsSUFBSTtZQUNGLDJCQUEyQjtZQUMzQixnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQU8sR0FBRyxFQUFFLGNBQWMsRUFBRSxFQUFFO2dCQUN0RCxJQUFJLEdBQUcsRUFBRTtvQkFDUCwrREFBK0Q7b0JBQy9ELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO2lCQUNyRTtnQkFDRCw0Q0FBNEM7Z0JBQzVDLFFBQVEsR0FBRyxjQUFjLENBQUM7Z0JBQzFCLGtCQUFrQjtnQkFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUV6RCxrQkFBa0I7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUEsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLGtEQUFrRDtZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBaEZXLFFBQUEsa0JBQWtCLHNCQWdGN0IifQ==