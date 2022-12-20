import express from 'express';
import { userRoute } from './user';
import { defaultRoute } from './defaultRoute';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoute);
