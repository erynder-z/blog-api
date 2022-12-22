import express from 'express';
import { userRoute } from './user';
import { defaultRoute } from './defaultRoute';
import { blogRoute } from './blog';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoute);
routes.use(blogRoute);
