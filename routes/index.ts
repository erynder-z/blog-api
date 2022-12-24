import express from 'express';
import { loginRoute } from './login';
import { signupRoute } from './signup';
import { defaultRoute } from './defaultRoute';
import { blogRoute } from './blog';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(loginRoute);
routes.use(signupRoute);
routes.use(blogRoute);
