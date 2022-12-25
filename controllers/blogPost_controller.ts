import express, { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import async from 'async';
import Post from '../models/post';
import Tag from '../models/tag';

const show_blogPost_get = (req: Request, res: Response) => {
  res.send('show blogpost get');
};

const create_blogPost_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      res.json({ tags: results.tags });
    }
  );
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
  body('tag.*').escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      timestamp: Date.now(),
      tags: [],
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

const delete_blogPost_get = (req: Request, res: Response) => {
  res.send('delete blogpost get');
};

const delete_blogPost_post = (req: Request, res: Response) => {
  res.send('delete blogpost post');
};

const update_blogPost_get = (req: Request, res: Response) => {
  res.send('delete blogpost get');
};

const update_blogPost_post = (req: Request, res: Response) => {
  res.send('delete blogpost post');
};

export {
  show_blogPost_get,
  create_blogPost_get,
  create_blogPost_post,
  delete_blogPost_get,
  delete_blogPost_post,
  update_blogPost_get,
  update_blogPost_post,
};
