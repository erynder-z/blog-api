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
const article_controller = __importStar(require("../controllers/article_controller"));
const comment_controller = __importStar(require("../controllers/comment_controller"));
exports.blogRoute = (0, express_1.Router)();
exports.blogRoute.get('/api/articles/all', article_controller.showAllArticles);
exports.blogRoute.get('/api/articles/latest', article_controller.showLatestArticles);
exports.blogRoute.get('/api/admin/articles/all', passport_1.default.authenticate('jwt', { session: false }), article_controller.showAllArticlesAdmin);
exports.blogRoute.get('/api/admin/articles/published', passport_1.default.authenticate('jwt', { session: false }), article_controller.showAllArticles);
exports.blogRoute.get('/api/admin/articles/unpublished', passport_1.default.authenticate('jwt', { session: false }), article_controller.showUnpublishedArticles);
exports.blogRoute.get('/api/articles/:id', article_controller.showCertainArticle);
exports.blogRoute.get('/api/articles/random', article_controller.getRandomArticleId);
exports.blogRoute.post('/api/admin/articles', passport_1.default.authenticate('jwt', { session: false }), article_controller.createArticle);
exports.blogRoute.delete('/api/admin/articles/:id', passport_1.default.authenticate('jwt', { session: false }), article_controller.deleteArticle);
exports.blogRoute.put('/api/admin/articles/:id', passport_1.default.authenticate('jwt', { session: false }), article_controller.update_article);
exports.blogRoute.post('/api/articles/:id/comment', comment_controller.createComment);
exports.blogRoute.delete('/api/admin/articles/:id/comment', passport_1.default.authenticate('jwt', { session: false }), comment_controller.deleteComment);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JvdXRlcy9ibG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWlDO0FBQ2pDLHdEQUFnQztBQUNoQyxzRkFBd0U7QUFDeEUsc0ZBQXdFO0FBRTNELFFBQUEsU0FBUyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRWxDLGlCQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXZFLGlCQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0UsaUJBQVMsQ0FBQyxHQUFHLENBQ1gseUJBQXlCLEVBQ3pCLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FDeEMsQ0FBQztBQUVGLGlCQUFTLENBQUMsR0FBRyxDQUNYLCtCQUErQixFQUMvQixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsa0JBQWtCLENBQUMsZUFBZSxDQUNuQyxDQUFDO0FBRUYsaUJBQVMsQ0FBQyxHQUFHLENBQ1gsaUNBQWlDLEVBQ2pDLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FDM0MsQ0FBQztBQUVGLGlCQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFMUUsaUJBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU3RSxpQkFBUyxDQUFDLElBQUksQ0FDWixxQkFBcUIsRUFDckIsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELGtCQUFrQixDQUFDLGFBQWEsQ0FDakMsQ0FBQztBQUVGLGlCQUFTLENBQUMsTUFBTSxDQUNkLHlCQUF5QixFQUN6QixrQkFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFDaEQsa0JBQWtCLENBQUMsYUFBYSxDQUNqQyxDQUFDO0FBRUYsaUJBQVMsQ0FBQyxHQUFHLENBQ1gseUJBQXlCLEVBQ3pCLGtCQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUNoRCxrQkFBa0IsQ0FBQyxjQUFjLENBQ2xDLENBQUM7QUFFRixpQkFBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUU5RSxpQkFBUyxDQUFDLE1BQU0sQ0FDZCxpQ0FBaUMsRUFDakMsa0JBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ2hELGtCQUFrQixDQUFDLGFBQWEsQ0FDakMsQ0FBQyJ9