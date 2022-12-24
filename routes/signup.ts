import { Router } from 'express';
import { signup_post } from '../controllers/signup_controller';

export const signupRoute = Router();

signupRoute.post('/api/signup', signup_post);
