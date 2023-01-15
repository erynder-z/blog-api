import express from 'express';
import { authRoute } from './auth';
import { signupRoute } from './signup';
import { defaultRoute } from './defaultRoute';
import { blogRoute } from './blog';
import { tagRoute } from './tag';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(authRoute);
routes.use(signupRoute);
routes.use(blogRoute);
routes.use(tagRoute);
