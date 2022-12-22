import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import * as blogPost_controller from '../controllers/blogPost_controller';

export const blogRoute = Router();

blogRoute.post('/post/:id', blogPost_controller.show_blogPost_get);

blogRoute.get('/create_post', blogPost_controller.create_blogPost_get);

blogRoute.post('/create_post', blogPost_controller.create_blogPost_post);

blogRoute.post('/delete_post/:id', blogPost_controller.delete_blogPost_post);

blogRoute.get('/update_post/:id', blogPost_controller.update_blogPost_get);

blogRoute.post('/update_post/:id', blogPost_controller.update_blogPost_post);
