import express from 'express';
import { authRoute } from './auth';
import { signupRoute } from './signup';
import { blogRoute } from './blog';
import { tagRoute } from './tag';
import { getApiKeysRoute } from './getApiKeys';

export const routes = express.Router();

routes.use(authRoute);
routes.use(signupRoute);
routes.use(getApiKeysRoute);
routes.use(blogRoute);
routes.use(tagRoute);
