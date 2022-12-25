import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as blogPost_controller from '../controllers/blogPost_controller';

export const blogRoute = Router();

blogRoute.post('/api/post/:id', blogPost_controller.show_blogPost_get);

blogRoute.get('/api/create_post', blogPost_controller.create_blogPost_get);

blogRoute.post(
  '/api/create_post',
  passport.authenticate('jwt', { session: false }),
  blogPost_controller.create_blogPost_post
);

blogRoute.post(
  '/api/delete_post/:id',
  blogPost_controller.delete_blogPost_post
);

blogRoute.get('/api/update_post/:id', blogPost_controller.update_blogPost_get);

blogRoute.post(
  '/api/update_post/:id',
  blogPost_controller.update_blogPost_post
);
