"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./login");
const signup_1 = require("./signup");
const defaultRoute_1 = require("./defaultRoute");
const blog_1 = require("./blog");
exports.routes = express_1.default.Router();
exports.routes.use(defaultRoute_1.defaultRoute);
exports.routes.use(login_1.loginRoute);
exports.routes.use(signup_1.signupRoute);
exports.routes.use(blog_1.blogRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb3V0ZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG1DQUFxQztBQUNyQyxxQ0FBdUM7QUFDdkMsaURBQThDO0FBQzlDLGlDQUFtQztBQUV0QixRQUFBLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXZDLGNBQU0sQ0FBQyxHQUFHLENBQUMsMkJBQVksQ0FBQyxDQUFDO0FBQ3pCLGNBQU0sQ0FBQyxHQUFHLENBQUMsa0JBQVUsQ0FBQyxDQUFDO0FBQ3ZCLGNBQU0sQ0FBQyxHQUFHLENBQUMsb0JBQVcsQ0FBQyxDQUFDO0FBQ3hCLGNBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQVMsQ0FBQyxDQUFDIn0=