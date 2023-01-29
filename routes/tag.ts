import { Router } from 'express';
import passport from 'passport';
import * as tag_controller from '../controllers/tag_controller';

export const tagRoute = Router();

tagRoute.get('/api/tags', tag_controller.showAllTags);

tagRoute.post(
  '/api/admin/tags',
  passport.authenticate('jwt', { session: false }),
  tag_controller.createTag
);

tagRoute.delete(
  '/api/admin/tags/:id',
  passport.authenticate('jwt', { session: false }),
  tag_controller.deleteTag
);

tagRoute.put(
  '/api/admin/tags/:id',
  passport.authenticate('jwt', { session: false }),
  tag_controller.updateTag
);
