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
const author_1 = __importDefault(require("../models/author"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29uZmlncy9wYXNzcG9ydC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLG1EQUEyRDtBQUMzRCwrQ0FBbUU7QUFDbkUsb0RBQTRCO0FBQzVCLDhEQUFzQztBQUUvQixNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUNyQyw0REFBNEQ7SUFDNUQsa0JBQVEsQ0FBQyxHQUFHLENBQ1YsSUFBSSx1QkFBVyxDQUNiO1FBQ0UsaUVBQWlFO1FBQ2pFLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQjtRQUN6Qyw0RUFBNEU7UUFDNUUsY0FBYyxFQUFFLHlCQUFVLENBQUMsMkJBQTJCLEVBQUU7S0FDekQsRUFDRCxDQUFPLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwQixJQUFJO1lBQ0YsdUNBQXVDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLGtEQUFrRDtZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQyxDQUFBLENBQ0YsQ0FDRixDQUFDO0lBRUYsZ0ZBQWdGO0lBQ2hGLGtCQUFRLENBQUMsR0FBRyxDQUNWLE9BQU8sRUFDUCxJQUFJLHlCQUFhLENBQUMsQ0FBTyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ25ELElBQUk7WUFDRiwyQ0FBMkM7WUFDM0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCx3Q0FBd0M7Z0JBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsOERBQThEO1lBQzlELE1BQU0sZUFBZSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0RSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNwQixpREFBaUQ7Z0JBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsd0RBQXdEO1lBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxrREFBa0Q7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztJQUVGLDhDQUE4QztJQUM5QyxrQkFBUSxDQUFDLEdBQUcsQ0FDVixRQUFRLEVBQ1IsSUFBSSx5QkFBYSxDQUFDLENBQU8sUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNuRCxJQUFJO1lBQ0YsMkJBQTJCO1lBQzNCLGdCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBTyxHQUFHLEVBQUUsY0FBYyxFQUFFLEVBQUU7Z0JBQ3RELElBQUksR0FBRyxFQUFFO29CQUNQLCtEQUErRDtvQkFDL0QsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7aUJBQ3JFO2dCQUNELDRDQUE0QztnQkFDNUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztnQkFDMUIsa0JBQWtCO2dCQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBRXpELGtCQUFrQjtnQkFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsa0RBQWtEO1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUM7QUFoRlcsUUFBQSxrQkFBa0Isc0JBZ0Y3QiJ9