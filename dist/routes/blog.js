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
const comment_controller = __importStar(require("../controllers/comment_controller"));
exports.blogRoute = (0, express_1.Router)();
exports.blogRoute.get('/api/posts/all', blogPost_controller.showAllPosts);
exports.blogRoute.get('/api/posts/latest', blogPost_controller.showLatestPosts);
exports.blogRoute.get('/api/admin/posts/all', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.showAllPostsAdmin);
exports.blogRoute.get('/api/admin/posts/published', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.showAllPosts);
exports.blogRoute.get('/api/admin/posts/unpublished', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.showUnpublishedPosts);
exports.blogRoute.get('/api/posts/:id', blogPost_controller.showCertainPost);
exports.blogRoute.post('/api/posts', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.createBlogpostPost);
exports.blogRoute.delete('/api/posts/:id', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.deleteBlogpost);
exports.blogRoute.put('/api/posts/:id', passport_1.default.authenticate('jwt', { session: false }), blogPost_controller.update_blogPost);
exports.blogRoute.post('/api/posts/:id/comment', comment_controller.createComment);
exports.blogRoute.delete('/api/posts/:id/comment', passport_1.default.authenticate('jwt', { session: false }), comment_controller.deleteComment);
exports.blogRoute.put('/api/posts/:id/comment', passport_1.default.authenticate('jwt', { session: false }), comment_controller.editComment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9ibG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBQ2pDLHdEQUFnQztBQUNoQyx3RkFBMEU7QUFDMUUsc0ZBQXdFO0FBRTNELFFBQUEsU0FBUyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRWxDLGlCQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWxFLGlCQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXhFLGlCQUFTLENBQUMsR0FBRyxDQUNYLHNCQUFzQixFQUN0QixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsbUJBQW1CLENBQUMsaUJBQWlCLENBQ3RDLENBQUM7QUFFRixpQkFBUyxDQUFDLEdBQUcsQ0FDWCw0QkFBNEIsRUFDNUIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELG1CQUFtQixDQUFDLFlBQVksQ0FDakMsQ0FBQztBQUVGLGlCQUFTLENBQUMsR0FBRyxDQUNYLDhCQUE4QixFQUM5QixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsbUJBQW1CLENBQUMsb0JBQW9CLENBQ3pDLENBQUM7QUFFRixpQkFBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVyRSxpQkFBUyxDQUFDLElBQUksQ0FDWixZQUFZLEVBQ1osa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELG1CQUFtQixDQUFDLGtCQUFrQixDQUN2QyxDQUFDO0FBRUYsaUJBQVMsQ0FBQyxNQUFNLENBQ2QsZ0JBQWdCLEVBQ2hCLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxtQkFBbUIsQ0FBQyxjQUFjLENBQ25DLENBQUM7QUFFRixpQkFBUyxDQUFDLEdBQUcsQ0FDWCxnQkFBZ0IsRUFDaEIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELG1CQUFtQixDQUFDLGVBQWUsQ0FDcEMsQ0FBQztBQUVGLGlCQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNFLGlCQUFTLENBQUMsTUFBTSxDQUNkLHdCQUF3QixFQUN4QixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsa0JBQWtCLENBQUMsYUFBYSxDQUNqQyxDQUFDO0FBRUYsaUJBQVMsQ0FBQyxHQUFHLENBQ1gsd0JBQXdCLEVBQ3hCLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxrQkFBa0IsQ0FBQyxXQUFXLENBQy9CLENBQUMifQ==