import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import createError from 'http-errors';
import * as bodyParser from 'body-parser';
import { routes } from './routes';
import errorMiddleware from './middleware/error.middleware';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());

app.use('/', routes);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
