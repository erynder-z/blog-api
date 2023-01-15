import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import { login_post, check_token } from '../controllers/login_controller';

export const authRoute = Router();

authRoute.post('/api/login', login_post);

authRoute.get('/api/check-token', check_token);
