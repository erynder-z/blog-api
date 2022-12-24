import express, { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';

const signup_post = [
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    'password',
    'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.'
  )
    .trim()
    .isStrongPassword()
    .escape(),
  body('confirmPassword', 'Passwords do not match.').custom(
    (value: String, { req }) => value === req.body.password
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    passport.authenticate('signup', { session: false }, (err, user, info) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          username: req.body.username,
          errors: errors.array(),
        });
      }
      if (err) {
        return next(err);
      }
      res.json({
        message: 'Signed-up sucessfuly',
        user: req.user,
      });
    })(req, res, next);
  },
];

export { signup_post };
