import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as blogPost_controller from '../controllers/blogPost_controller';

export const blogRoute = Router();

blogRoute.get('/api/all_posts', blogPost_controller.show_all_posts);

blogRoute.get('/api/latest_posts', blogPost_controller.show_latest_posts);

blogRoute.get('/api/post/:id', blogPost_controller.show_certain_post);

blogRoute.get(
  '/api/create_post',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.create_blogPost_get
);

blogRoute.post(
  '/api/create_post',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.create_blogPost_post
);

blogRoute.delete(
  '/api/delete_post/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.delete_blogPost
);

blogRoute.put(
  '/api/update_post/:id',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.update_blogPost
);
