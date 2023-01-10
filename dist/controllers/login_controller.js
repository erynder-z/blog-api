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
                return next(err.message);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
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
            return next(error);
        }
    }))(req, res, next);
    // TODO: LOGOUT
});
exports.login_post = login_post;
const check_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const secret = process.env.TOKEN_SECRET_KEY;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (typeof decoded === 'object') {
                res.status(200).json({ user: decoded.user });
            }
            else {
                res.status(401);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.check_token = check_token;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5fY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2xvZ2luX2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQWdDO0FBQ2hDLGdFQUErQjtBQUUvQixNQUFNLFVBQVUsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzNFLGtCQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkQsSUFBSTtZQUNGLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUI7WUFFRCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUNsRCxJQUFJLEtBQUs7b0JBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTlCLE1BQU0sSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEQsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQ3BCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUNkLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUNqQztvQkFDRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFO2lCQUM5QyxDQUNGLENBQUM7Z0JBRUYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNkLEtBQUs7b0JBQ0wsSUFBSTtpQkFDTCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRW5CLGVBQWU7QUFDakIsQ0FBQyxDQUFBLENBQUM7QUF1Qk8sZ0NBQVU7QUFyQm5CLE1BQU0sV0FBVyxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDNUUsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtRQUN2QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQixDQUFDO1FBRXRELElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFbUIsa0NBQVcifQ==