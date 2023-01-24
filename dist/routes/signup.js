"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const signup_controller_1 = __importDefault(require("../controllers/signup_controller"));
exports.signupRoute = (0, express_1.Router)();
exports.signupRoute.post('/api/signup', (req, res, next) => {
    if (req.body.signup_secret !== process.env.SIGNUP_SECRET) {
        return res.status(401).json({ message: 'Invalid signup secret!' });
    }
    next();
}, passport_1.default.authenticate('signup', { session: false }), signup_controller_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL3NpZ251cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FBa0U7QUFDbEUsd0RBQWdDO0FBQ2hDLHlGQUFzRDtBQUV6QyxRQUFBLFdBQVcsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUVwQyxtQkFBVyxDQUFDLElBQUksQ0FDZCxhQUFhLEVBQ2IsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNsRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1FBQ3hELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO0tBQ3BFO0lBQ0QsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLEVBQ0Qsa0JBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ25ELDJCQUFNLENBQ1AsQ0FBQyJ9