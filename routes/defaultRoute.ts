import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/api', (req, res) => {
  res.send('blog startpage');
});

defaultRoute.post('/api', (req: Request, res: Response) => {
  res.send(req.body);
});
