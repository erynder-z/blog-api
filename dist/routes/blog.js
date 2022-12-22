"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blogPost_controller = __importStar(require("../controllers/blogPost_controller"));
exports.blogRoute = (0, express_1.Router)();
exports.blogRoute.post('/post/:id', blogPost_controller.show_blogPost_get);
exports.blogRoute.get('/create_post', blogPost_controller.create_blogPost_get);
exports.blogRoute.post('/create_post', blogPost_controller.create_blogPost_post);
exports.blogRoute.post('/delete_post/:id', blogPost_controller.delete_blogPost_post);
exports.blogRoute.get('/update_post/:id', blogPost_controller.update_blogPost_get);
exports.blogRoute.post('/update_post/:id', blogPost_controller.update_blogPost_post);
