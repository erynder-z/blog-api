import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
  res.send('Hello from default route!');
});

defaultRoute.post('/', (req: Request, res: Response) => {
  res.send(req.body);
});
