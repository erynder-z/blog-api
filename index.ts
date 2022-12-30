import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Schema } from 'mongoose';
import * as dotenv from 'dotenv';
import createError from 'http-errors';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { routes } from './routes';
import errorMiddleware from './middleware/error.middleware';
import passport from 'passport';
import { initializePassport } from './passport-config';

const app: Express = express();
dotenv.config();

const mongoDB = `${process.env.MONGODB_URI}`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

initializePassport();

app.use('/', routes);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
