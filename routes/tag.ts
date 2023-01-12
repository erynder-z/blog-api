import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as tag_controller from '../controllers/tag_controller';

export const tagRoute = Router();

tagRoute.get('/api/tags', tag_controller.show_all_tags);

tagRoute.get('/api/tags/:id', tag_controller.show_tag_detail);

tagRoute.post(
  '/api/admin/tags',
  passport.authenticate('jwt', { session: false }),
  tag_controller.create_tag
);

tagRoute.delete(
  '/api/admin/tags/:id',
  passport.authenticate('jwt', { session: false }),
  tag_controller.delete_tag
);

tagRoute.put(
  '/api/admin/tags/:id',
  passport.authenticate('jwt', { session: false }),
  tag_controller.update_tag
);
