"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
const signup_1 = require("./signup");
const blog_1 = require("./blog");
const tag_1 = require("./tag");
exports.routes = express_1.default.Router();
exports.routes.use(auth_1.authRoute);
exports.routes.use(signup_1.signupRoute);
exports.routes.use(blog_1.blogRoute);
exports.routes.use(tag_1.tagRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGlDQUFtQztBQUNuQyxxQ0FBdUM7QUFDdkMsaUNBQW1DO0FBQ25DLCtCQUFpQztBQUVwQixRQUFBLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXZDLGNBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQVMsQ0FBQyxDQUFDO0FBQ3RCLGNBQU0sQ0FBQyxHQUFHLENBQUMsb0JBQVcsQ0FBQyxDQUFDO0FBQ3hCLGNBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQVMsQ0FBQyxDQUFDO0FBQ3RCLGNBQU0sQ0FBQyxHQUFHLENBQUMsY0FBUSxDQUFDLENBQUMifQ==