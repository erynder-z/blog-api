import express, { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { CallbackError } from 'mongoose';
import Comment, { ICommentModel } from '../models/comment';

const create_comment = [
  body('author', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const parentPostId = req.params.id;

    const comment = new Comment({
      parentPost: parentPostId,
      author: req.body.author,
      text: req.body.text,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.status(400).json({
        title: 'Failed to save comment!',
        errors: errors.array(),
        comment,
      });
      return;
    }

    comment.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        title: 'Comment saved successfully!',
        comment,
      });
    });
  },
];

const delete_comment = (req: Request, res: Response, next: NextFunction) => {
  Comment.findById(req.params.id).exec(function (
    err: CallbackError,
    result: ICommentModel | null
  ) {
    if (err) {
      return next(err);
    }
    Comment.findByIdAndRemove(result?._id, (err: CallbackError) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ title: 'Comment deleted!' });
    });
  });
};

const edit_comment = [
  body('author', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const parentPostId = req.params.id;

    const comment = new Comment({
      _id: req.params.id,
      parentPost: parentPostId,
      author: req.body.author,
      text: req.body.text,
      timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.status(400).json({
        title: 'Failed to edit comment!',
        errors: errors.array(),
        comment,
      });
      return;
    }

    Comment.findByIdAndUpdate(
      req.params.id,
      comment,
      {},
      (err: CallbackError, theComment: ICommentModel | null) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({
          title: 'Comment edited successfully!',
          comment,
        });
      }
    );
  },
];

export { create_comment, delete_comment, edit_comment };
