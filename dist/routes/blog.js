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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const blogPost_controller = __importStar(require("../controllers/blogPost_controller"));
exports.blogRoute = (0, express_1.Router)();
exports.blogRoute.get('/api/posts/all', blogPost_controller.show_all_posts);
exports.blogRoute.get('/api/posts/latest', blogPost_controller.show_latest_posts);
exports.blogRoute.get('/api/posts/:id', blogPost_controller.show_certain_post);
exports.blogRoute.get('/api/posts', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.create_blogPost_get);
exports.blogRoute.post('/api/posts', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.create_blogPost_post);
exports.blogRoute.delete('/api/posts/:id', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.delete_blogPost);
exports.blogRoute.put('/api/posts/:id', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.update_blogPost);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9ibG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBQ2pDLHdEQUFnQztBQUNoQyx3RkFBMEU7QUFFN0QsUUFBQSxTQUFTLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFbEMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFcEUsaUJBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUxRSxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXZFLGlCQUFTLENBQUMsR0FBRyxDQUNYLFlBQVksRUFDWixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsbUJBQW1CLENBQUMsbUJBQW1CLENBQ3hDLENBQUM7QUFFRixpQkFBUyxDQUFDLElBQUksQ0FDWixZQUFZLEVBQ1osa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELG1CQUFtQixDQUFDLG9CQUFvQixDQUN6QyxDQUFDO0FBRUYsaUJBQVMsQ0FBQyxNQUFNLENBQ2QsZ0JBQWdCLEVBQ2hCLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxtQkFBbUIsQ0FBQyxlQUFlLENBQ3BDLENBQUM7QUFFRixpQkFBUyxDQUFDLEdBQUcsQ0FDWCxnQkFBZ0IsRUFDaEIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELG1CQUFtQixDQUFDLGVBQWUsQ0FDcEMsQ0FBQyJ9