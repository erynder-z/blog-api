import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const login_post = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(new Error('Authentication failed: ' + info.message));
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(new Error('Error while logging in: ' + error));
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
      return next(new Error('Error while authenticating: ' + error));
    }
  })(req, res, next);
};

const check_token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
      return next(new Error('Authorization header is missing'));
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
      return next(new Error('Authorization header is malformed'));
    }

    const token = bearer[1];
    if (!token) {
      return next(new Error('Token is missing'));
    }

    const secret = process.env.TOKEN_SECRET_KEY as string;
    const decoded = jwt.verify(token, secret);
    if (!decoded || typeof decoded !== 'object') {
      return next(new Error('Token is invalid'));
    }

    res.status(200).json({ user: decoded.user });
  } catch (error) {
    next(new Error('Error while checking token: ' + error));
  }
};

export { login_post, check_token };
