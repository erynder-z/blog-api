import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as blogPost_controller from '../controllers/blogPost_controller';
import * as comment_controller from '../controllers/comment_controller';

export const blogRoute = Router();

blogRoute.get('/api/posts/all', blogPost_controller.showAllPosts);

blogRoute.get('/api/posts/latest', blogPost_controller.showLatestPosts);

blogRoute.get(
  '/api/admin/posts/all',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.showAllPostsAdmin
);

blogRoute.get(
  '/api/admin/posts/published',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.showAllPosts
);

blogRoute.get(
  '/api/admin/posts/unpublished',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.showUnpublishedPosts
);

blogRoute.get('/api/posts/:id', blogPost_controller.showCertainPost);

blogRoute.post(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.createBlogpostPost
);

blogRoute.delete(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.deleteBlogpost
);

blogRoute.put(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.update_blogPost
);

blogRoute.post('/api/posts/:id/comment', comment_controller.createComment);

blogRoute.delete(
  '/api/posts/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.deleteComment
);

blogRoute.put(
  '/api/posts/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.editComment
);
