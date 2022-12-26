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
    passport_1.default.use(new passport_jwt_1.Strategy({
        secretOrKey: process.env.TOKEN_SECRET_KEY,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return done(null, token.user);
        }
        catch (error) {
            done(error);
        }
    })));
    passport_1.default.use('login', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield author_1.default.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatches) {
                return done(null, false, { message: 'invalid credentials!' });
            }
            return done(null, user, { message: 'Logged in successfully!' });
        }
        catch (error) {
            return done(error);
        }
    })));
    passport_1.default.use('signup', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            bcrypt_1.default.hash(password, 10, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return done(null, false, { message: 'Error processing password!' });
                }
                // store hashedPassword in DB
                password = hashedPassword;
                const user = yield author_1.default.create({ username, password });
                return done(null, user);
            }));
        }
        catch (error) {
            done(error);
        }
    })));
};
exports.initializePassport = initializePassport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcGFzc3BvcnQtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxtREFBMkQ7QUFDM0QsK0NBQW1FO0FBQ25FLG9EQUE0QjtBQUM1Qiw2REFBcUM7QUFFOUIsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDckMsa0JBQVEsQ0FBQyxHQUFHLENBQ1YsSUFBSSx1QkFBVyxDQUNiO1FBQ0UsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1FBQ3pDLGNBQWMsRUFBRSx5QkFBVSxDQUFDLDJCQUEyQixFQUFFO0tBQ3pELEVBQ0QsQ0FBTyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEIsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNiO0lBQ0gsQ0FBQyxDQUFBLENBQ0YsQ0FDRixDQUFDO0lBRUYsa0JBQVEsQ0FBQyxHQUFHLENBQ1YsT0FBTyxFQUNQLElBQUkseUJBQWEsQ0FBQyxDQUFPLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDbkQsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRWhELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7YUFDekQ7WUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEUsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7YUFDL0Q7WUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztTQUNqRTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7SUFFRixrQkFBUSxDQUFDLEdBQUcsQ0FDVixRQUFRLEVBQ1IsSUFBSSx5QkFBYSxDQUFDLENBQU8sUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNuRCxJQUFJO1lBQ0YsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFPLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7aUJBQ3JFO2dCQUNELDZCQUE2QjtnQkFDN0IsUUFBUSxHQUFHLGNBQWMsQ0FBQztnQkFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUV6RCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTNEVyxRQUFBLGtCQUFrQixzQkEyRDdCIn0=