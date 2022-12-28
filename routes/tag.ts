import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as tag_controller from '../controllers/tag_controller';

export const tagRoute = Router();

tagRoute.get('/api/tags', tag_controller.show_all_tags);

tagRoute.get('/api/tag/:id', tag_controller.show_tag_detail);

tagRoute.post(
  '/api/create_tag',
  passport.authenticate('jwt', { session: false }),
  tag_controller.create_tag
);

tagRoute.delete(
  '/api/tag/:id/delete',
  passport.authenticate('jwt', { session: false }),
  tag_controller.create_tag
);

tagRoute.put(
  '/api/tag/:id/update',
  passport.authenticate('jwt', { session: false }),
  tag_controller.update_tag
);
