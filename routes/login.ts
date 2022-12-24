import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import { login_post } from '../controllers/login_controller';

export const loginRoute = Router();

loginRoute.post('/api/login', login_post);
