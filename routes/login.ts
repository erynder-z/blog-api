import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

export const loginRoute = Router();

loginRoute.get('/api/login', (req: Request, res: Response) => {
  res.send('HELLO FROM login');
});

loginRoute.post('/api/login', (req: Request, res: Response) => {
  res.send(req.body);
});
