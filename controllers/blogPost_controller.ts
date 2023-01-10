import express, { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import async from 'async';
import Post, { IPostModel } from '../models/post';
import Tag from '../models/tag';
import Comment from '../models/comment';
import { CallbackError } from 'mongoose';

const show_all_posts = (req: Request, res: Response, next: NextFunction) => {
  Post.find({ isPublished: true })
    .sort({
      timestamp: -1,
    })
    .populate('author', 'username')
    .populate('comments')
    .populate('tags')
    .exec(function (err: CallbackError, list_posts: IPostModel[] | null) {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        post_list: list_posts,
      });
    });
};

const show_all_posts_admin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.find({})
    .sort({
      timestamp: -1,
    })
    .populate('author', 'username')
    .populate('comments')
    .populate('tags')
    .exec(function (err: CallbackError, list_posts: IPostModel[] | null) {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        post_list: list_posts,
      });
    });
};

const show_latest_posts = (req: Request, res: Response, next: NextFunction) => {
  const postLimit = 12;

  Post.find({ isPublished: true })
    .sort({ timestamp: -1 })
    .populate('author', 'username')
    .populate('comments')
    .populate('tags')
    .limit(postLimit)
    .exec(function (err: CallbackError, list_posts: IPostModel[] | null) {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        post_list: list_posts,
      });
    });
};

const show_certain_post = (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.params.id)
    .sort({ timestamp: -1 })
    .populate('author', 'username')
    .populate('comments')
    .populate('tags')
    .exec(function (err: CallbackError, post: IPostModel | null) {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        post: post,
      });
    });
};

const show_unpublished_posts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.find({ isPublished: false })
    .sort({
      timestamp: -1,
    })
    .populate('author', 'username')
    .populate('comments')
    .populate('tags')
    .exec(function (err: CallbackError, list_posts: IPostModel[] | null) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        post_list: list_posts,
      });
    });
};

const create_blogPost_post = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.tag)) {
      req.body.tag = typeof req.body.tag === 'undefined' ? [] : [req.body.tag];
    }
    next();
  },
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('tags.*').escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const post = new Post({
      author: req.user,
      title: req.body.title,
      text: req.body.text,
      timestamp: Date.now(),
      tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
      comments: [],
      isPublished: false,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          tags(callback) {
            Tag.find(callback);
          },
        },
        (err: Error | undefined, results: async.Dictionary<any>) => {
          if (err) {
            return next(err);
          }

          for (const tag of results.tags) {
            if (post.tags.includes(tag._id)) {
              tag.checked = 'true';
            }
          }
          res.status(400).json({
            title: 'Failed to save post!',
            tags: results.tags,
            errors: errors.array(),
            post,
          });
        }
      );
      return;
    }

    post.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        title: 'Post saved successfully!',
        post,
      });
    });
  },
];

const delete_blogPost = (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.params.id).exec(function (
    err: CallbackError,
    result: IPostModel | null
  ) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndRemove(result?._id, (err: CallbackError) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ title: 'Post deleted!' });
    });
  });
};

const update_blogPost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.tags)) {
      req.body.tags =
        typeof req.body.tags === 'undefined' ? [] : [req.body.tags];
    }
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.comments)) {
      req.body.comments =
        typeof req.body.comments === 'undefined' ? [] : [req.body.comments];
    }
    next();
  },

  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('tags.*').escape(),
  body('comments.*').escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const post = new Post({
      _id: req.params.id,
      author: req.body.author,
      title: req.body.title,
      text: req.body.text,
      timestamp: req.body.timestamp,
      image: {
        data: req.file?.buffer,
        contentType: req.file?.mimetype,
      },
      tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
      comments:
        typeof req.body.comments === 'undefined' ? [] : req.body.comments,
      isPublished: req.body.isPublished,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          tags(callback) {
            Tag.find(callback);
          },
          comments(callback) {
            Comment.find(callback);
          },
        },
        (err: Error | undefined, results: async.Dictionary<any>) => {
          if (err) {
            return next(err);
          }

          for (const tag of results.tags) {
            if (post.tags.includes(tag._id)) {
              tag.checked = 'true';
            }
          }

          for (const comment of results.comments) {
            if (post.comments.includes(comment._id)) {
              comment.checked = 'true';
            }
          }

          res.status(400).json({
            title: 'Failed to update post!',
            tags: results.tags,
            comments: results.comments,
            errors: errors.array(),
            post,
          });
        }
      );
      return;
    }

    Post.findByIdAndUpdate(
      req.params.id,
      post,
      {},
      (err: CallbackError, thePost: IPostModel | null) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({
          title: 'Post updated successfully!',
          post,
        });
      }
    );
  },
];

export {
  show_all_posts,
  show_all_posts_admin,
  show_latest_posts,
  show_certain_post,
  show_unpublished_posts,
  create_blogPost_post,
  delete_blogPost,
  update_blogPost,
};
