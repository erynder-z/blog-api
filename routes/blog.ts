import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as blogPost_controller from '../controllers/blogPost_controller';
import * as comment_controller from '../controllers/comment_controller';

export const blogRoute = Router();

blogRoute.get('/api/posts/all', blogPost_controller.show_all_posts);

blogRoute.get('/api/posts/latest', blogPost_controller.show_latest_posts);

blogRoute.get(
  '/api/admin/posts/all',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.show_all_posts_admin
);

blogRoute.get(
  '/api/admin/posts/published',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.show_all_posts
);

blogRoute.get(
  '/api/admin/posts/unpublished',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.show_unpublished_posts
);

blogRoute.get('/api/posts/:id', blogPost_controller.show_certain_post);

blogRoute.post(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.create_blogPost_post
);

blogRoute.delete(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.delete_blogPost
);

blogRoute.put(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.update_blogPost
);

blogRoute.post('/api/posts/:id/comment', comment_controller.create_comment);

blogRoute.delete(
  '/api/posts/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.delete_comment
);

blogRoute.put(
  '/api/posts/:id/comment',
  passport.authenticate('jwt', { session: false }),
  comment_controller.edit_comment
);
