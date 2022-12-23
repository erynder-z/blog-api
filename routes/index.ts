import express from 'express';
import { loginRoute } from './login';
import { defaultRoute } from './defaultRoute';
import { blogRoute } from './blog';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(loginRoute);
routes.use(blogRoute);
