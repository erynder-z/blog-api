import express, { Express, NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import async from 'async';
import Post, { IPostModel } from '../models/post';
import Tag, { ITagModel } from '../models/tag';
import Comment from '../models/comment';
import { CallbackError } from 'mongoose';

const show_all_tags = (req: Request, res: Response, next: NextFunction) => {
  Tag.find({})
    .sort([['tag', 'ascending']])
    .exec(function (err: CallbackError, list_tags: ITagModel[] | null) {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        tag_list: list_tags,
      });
    });
};

const show_tag_detail = (req: Request, res: Response, next: NextFunction) => {
  async.parallel(
    {
      tag(callback) {
        Tag.findById(req.params.id).exec(callback);
      },

      tag_posts(callback) {
        Post.find({ tag: req.params.id }).exec(callback);
      },
    },
    (err: Error | undefined, results: async.Dictionary<any>) => {
      if (err) {
        return next(err);
      }
      if (results.tag == null) {
        res.status(404).json({ message: 'Tag not found' });
        return next(err);
      }

      res.status(200).json({
        title: `Posts tagged with ${results.tag}`,
        tag: results.tag,
        tag_posts: results.tag_posts,
      });
    }
  );
};

const create_tag = [
  body('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const tag = new Tag({ name: req.body.tagName });

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Could not create tag.',
        tag,
        errors: errors.array(),
      });
      return;
    } else {
      Tag.findOne({ name: req.body.tagName }).exec(
        (err: CallbackError, found_tag: ITagModel | null) => {
          if (err) {
            return next(err);
          }

          if (found_tag) {
            res.redirect(`${found_tag.url}`);
          } else {
            tag.save((err) => {
              if (err) {
                return next(err);
              }
              res.status(200).json({
                title: 'Tag saved successfully!',
                tag,
              });
            });
          }
        }
      );
    }
  },
];

const delete_tag = (req: Request, res: Response, next: NextFunction) => {
  async.parallel(
    {
      tag(callback) {
        Tag.findById(req.body.tagid).exec(callback);
      },
      tag_posts(callback) {
        Post.find({ genre: req.body.genreid }).exec(callback);
      },
    },
    (err: Error | undefined, results: async.Dictionary<any>) => {
      if (err) {
        return next(err);
      }

      if (results.tag_posts.length > 0) {
        res.status(400).json({});
        res.status(400).json({
          title: `Unable to delete! Posts tagged with ${results.tag}`,
          tag: results.tag,
          tag_posts: results.tag_posts,
        });
        return;
      }

      Tag.findByIdAndRemove(req.body.tagid, (err: CallbackError) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ title: 'Tag deleted!' });
      });
    }
  );
};

const update_tag = [
  body('tagName', 'Tag name required').trim().isLength({ min: 1 }).escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const tag = new Tag({
      name: req.body.tagName,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.status(400).json({
        title: 'Failed to update tag!',
        errors: errors.array(),
        tag,
      });
      return;
    }

    Tag.findByIdAndUpdate(
      req.params.id,
      tag,
      {},
      (err: CallbackError, theTag: ITagModel | null) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({
          title: 'Tag updated successfully!',
          tag,
        });
      }
    );
  },
];

export { show_all_tags, show_tag_detail, create_tag, delete_tag, update_tag };
