import express, { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const login_post = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(err.message);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign(
          { user: body },
          `${process.env.TOKEN_SECRET_KEY}`,
          {
            expiresIn: `${process.env.TOKEN_EXPIRE_TIME}`,
          }
        );

        return res.json({
          token,
          body,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export { login_post };
