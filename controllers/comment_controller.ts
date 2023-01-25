import express, { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { CallbackError } from 'mongoose';
import Comment, { ICommentModel } from '../models/comment';
import Article, { IArticleModel } from '../models/article';
import Filter from 'bad-words';

const filter = new Filter();

const badwordsArray = require('badwords/array');
filter.addWords(...badwordsArray);

const createComment = [
  body('author', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        title: 'Failed to save comment!',
        errors: errors.array(),
      });
    }

    const parentArticleId = req.params.id;
    const post = await Article.findById(parentArticleId);
    if (!post) {
      return res.status(404).json({ title: 'Article not found' });
    }

    const comment = new Comment({
      parentArticle: parentArticleId,
      author: filter.clean(req.body.author),
      text: filter.clean(req.body.text),
      timestamp: Date.now(),
    });

    try {
      await comment.save();
      post.comments.push(comment._id);
      await post.save();
      res.status(200).json({
        title: 'Comment saved successfully!',
        comment,
        post,
      });
    } catch (err) {
      next(err);
    }
  },
];

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ title: 'Comment not found' });
    }
    const parentArticleId = comment.parentArticle;

    await Comment.findByIdAndRemove(comment._id);
    await Article.findByIdAndUpdate(parentArticleId, {
      $pull: { comments: comment._id },
    });

    res.status(200).json({ title: 'Comment deleted!' });
  } catch (err) {
    next(err);
  }
};

const editComment = [
  body('author', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        title: 'Failed to edit comment!',
        errors: errors.array(),
      });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ title: 'Comment not found' });
    }
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.timestamp = new Date();

    try {
      await comment.save();
      res.status(200).json({
        title: 'Comment edited successfully!',
        comment,
      });
    } catch (err) {
      next(err);
    }
  },
];

export { createComment, deleteComment, editComment };
