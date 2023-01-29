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
exports.check_token = exports.login_post = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                return next(new Error('Authentication failed: ' + info.message));
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(new Error('Error while logging in: ' + error));
                const body = { _id: user._id, username: user.username };
                const token = jsonwebtoken_1.default.sign({ user: body }, `${process.env.TOKEN_SECRET_KEY}`, {
                    expiresIn: `${process.env.TOKEN_EXPIRE_TIME}`,
                });
                return res.json({
                    token,
                    body,
                });
            }));
        }
        catch (error) {
            return next(new Error('Error while authenticating: ' + error));
        }
    }))(req, res, next);
});
exports.login_post = login_post;
const check_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return next(new Error('Authorization header is missing'));
        }
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
            return next(new Error('Authorization header is malformed'));
        }
        const token = bearer[1];
        if (!token) {
            return next(new Error('Token is missing'));
        }
        const secret = process.env.TOKEN_SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || typeof decoded !== 'object') {
            return next(new Error('Token is invalid'));
        }
        res.status(200).json({ user: decoded.user });
    }
    catch (error) {
        next(new Error('Error while checking token: ' + error));
    }
});
exports.check_token = check_token;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvYXV0aF9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFnQztBQUNoQyxnRUFBK0I7QUFFL0IsTUFBTSxVQUFVLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMzRSxrQkFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZELElBQUk7WUFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDbEU7WUFDRCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUNsRCxJQUFJLEtBQUs7b0JBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FDcEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQ2QsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEVBQ2pDO29CQUNFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7aUJBQzlDLENBQ0YsQ0FBQztnQkFDRixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2QsS0FBSztvQkFDTCxJQUFJO2lCQUNMLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsOEJBQThCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUMsQ0FBQSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUEsQ0FBQztBQStCTyxnQ0FBVTtBQTdCbkIsTUFBTSxXQUFXLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM1RSxJQUFJO1FBQ0YsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQztTQUM3RDtRQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEIsQ0FBQztRQUN0RCxNQUFNLE9BQU8sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFbUIsa0NBQVcifQ==