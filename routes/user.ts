import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

export const userRoute = Router();

userRoute.get('/user', (req: Request, res: Response) => {
  res.send('HELLO FROM userroute');
});

userRoute.post('/user', (req: Request, res: Response) => {
  res.send(req.body);
});
