import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import Author from './models/author';

export const initializePassport = () => {
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
          console.log(error);
          return done(error);
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
        console.log(error);
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
            return done(null, false, { message: 'Error processing password!' });
          }
          // store hashedPassword in DB
          password = hashedPassword;
          const user = await Author.create({ username, password });

          return done(null, user);
        });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );
};
