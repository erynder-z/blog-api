import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose, { Schema } from 'mongoose';
import * as dotenv from 'dotenv';
import createError from 'http-errors';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { routes } from './routes';
import errorMiddleware from './middleware/error.middleware';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import Author from './models/author';

const app: Express = express();
dotenv.config();

const mongoDB = `${process.env.MONGODB_URI}`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(async (username, password, done) => {
    try {
      const user = await Author.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return done(null, false, { message: 'invalid credentials!' });
      }

      return done(null, user, { message: 'Logged in successfully!' });
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  'signup',
  new localStrategy(async (username, password, done) => {
    try {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // store hashedPassword in DB
        password = hashedPassword;
        const user = await Author.create({ username, password });

        return done(null, user);
      });
    } catch (error) {
      done(error);
    }
  })
);

app.use('/', routes);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`now listening on port ${process.env.PORT}`);
});
function next(err: NativeError): void {
  throw new Error('Function not implemented.');
}
