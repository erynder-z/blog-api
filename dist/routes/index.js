"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./login");
const defaultRoute_1 = require("./defaultRoute");
const blog_1 = require("./blog");
exports.routes = express_1.default.Router();
exports.routes.use(defaultRoute_1.defaultRoute);
exports.routes.use(login_1.loginRoute);
exports.routes.use(blog_1.blogRoute);
