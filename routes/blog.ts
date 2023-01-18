import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as article_controller from '../controllers/article_controller';
import * as comment_controller from '../controllers/comment_controller';

export const blogRoute = Router();

blogRoute.get('/api/articles/all', article_controller.showAllArticles);

blogRoute.get('/api/articles/latest', article_controller.showLatestArticles);

blogRoute.get(
  '/api/admin/articles/all',
  passport.authenticate('jwt', { session: false }),
  article_controller.showAllArticlesAdmin
);

blogRoute.get(
  '/api/admin/articles/published',
  passport.authenticate('jwt', { session: false }),
  article_controller.showAllArticles
);

blogRoute.get(
  '/api/admin/articles/unpublished',
  passport.authenticate('jwt', { session: false }),
  article_controller.showUnpublishedArticles
);

blogRoute.get('/api/articles/:id', article_controller.showCertainArticle);

blogRoute.post(
  '/api/articles',
  passport.authenticate('jwt', { session: false }),
  article_controller.createArticle
);

blogRoute.delete(
  '/api/articles/:id',
  passport.authenticate('jwt', { session: false }),
  article_controller.deleteArticle
);

blogRoute.put(
  '/api/articles/:id',
  passport.authenticate('jwt', { session: false }),
  article_controller.update_article
);

blogRoute.post('/api/articles/:id/comment', comment_controller.createComment);

blogRoute.delete(
  '/api/articles/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.deleteComment
);

blogRoute.put(
  '/api/articles/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.editComment
);
