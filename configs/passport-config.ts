import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import Author from '../models/author';

export const initializePassport = () => {
  // Use the JWT strategy to authenticate users based on a JWT
  passport.use(
    new JWTstrategy(
      {
        // Verify the JWT using the TOKEN_SECRET_KEY environment variable
        secretOrKey: process.env.TOKEN_SECRET_KEY,
        // Extract the JWT from the request's Authorization header as a Bearer token
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          // If the JWT is valid, return the user
          return done(null, token.user);
        } catch (error) {
          // If an error occurs, log the error and return it
          console.log(error);
          return done(error);
        }
      }
    )
  );

  // Use the login strategy to authenticate users based on a username and password
  passport.use(
    'login',
    new localStrategy(async (username, password, done) => {
      try {
        // Find the user with the provided username
        const user = await Author.findOne({ username });

        if (!user) {
          // If no user is found, return a message
          return done(null, false, { message: 'User not found' });
        }

        // Compare the provided password to the user's stored password
        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
          // If the passwords don't match, return a message
          return done(null, false, { message: 'invalid credentials!' });
        }

        // If the passwords match, return the user and a message
        return done(null, user, { message: 'Logged in successfully!' });
      } catch (error) {
        // If an error occurs, log the error and return it
        console.log(error);
        return done(error);
      }
    })
  );

  // Use the signup strategy to create new users
  passport.use(
    'signup',
    new localStrategy(async (username, password, done) => {
      try {
        // Hash the user's password
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) {
            // If an error occurs during password hashing, return a message
            return done(null, false, { message: 'Error processing password!' });
          }
          // Store the hashed password in the database
          password = hashedPassword;
          // Create the user
          const user = await Author.create({ username, password });

          // Return the user
          return done(null, user);
        });
      } catch (error) {
        // If an error occurs, log the error and return it
        console.log(error);
        return done(error);
      }
    })
  );
};
