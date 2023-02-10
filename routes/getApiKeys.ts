import { Router } from 'express';
import passport from 'passport';
import * as getApiKeys_controller from '../controllers/getApiKeys_controller';

export const getApiKeysRoute = Router();

getApiKeysRoute.get(
  '/api/keys',
  passport.authenticate('jwt', { session: false }),
  getApiKeys_controller.getApiKeys
);
