import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import createError from 'http-errors';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { routes } from './routes';
import errorMiddleware from './middleware/error.middleware';
import passport from 'passport';
import { initializePassport } from './configs/passport-config';
import { initializeMongoDB } from './configs/mongodb';

const app: Express = express();
dotenv.config();

initializeMongoDB();
initializePassport();

app.use(cors());
/* app.use(cors({
  origin: ['http://localhost:3000', 'http://example.com']
})); */
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());

app.use('/', routes);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
