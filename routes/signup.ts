import { Router } from 'express';
import signup from '../controllers/signup_controller';

export const signupRoute = Router();

signupRoute.post('/api/signup', signup);
