import { Router } from 'express';
import { login_post, check_token } from '../controllers/auth_controller';

export const authRoute = Router();

authRoute.post('/api/login', login_post);

authRoute.get('/api/check-token', check_token);
