import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import async from 'async';
import Article, { IArticleModel } from '../models/article';
import Tag from '../models/tag';
import { CallbackError } from 'mongoose';

const showAllArticles = (req: Request, res: Response, next: NextFunction) => {
  const query = { isPublished: true };
  const options = {
    sort: { timestamp: -1 },
    populate: [
      { path: 'author', select: 'username' },
      { path: 'comments' },
      { path: 'tags' },
    ],
  };

  Article.find(query, null, options).exec(
    (err: CallbackError, listArticles: IArticleModel[] | null) => {
      if (err) {
        return next();
      }

      if (!listArticles) {
        res.status(404).json({ message: 'No articles found' });
      }

      res.status(200).json({
        article_list: listArticles,
      });
    }
  );
};

const showAllArticlesAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = {};
  const options = {
    sort: { timestamp: -1 },
    populate: [
      { path: 'author', select: 'username' },
      { path: 'comments' },
      { path: 'tags' },
    ],
  };

  Article.find(query, null, options).exec(
    (err: CallbackError, listArticles: IArticleModel[] | null) => {
      if (err) {
        return next();
      }

      if (!listArticles) {
        res.status(404).json({ message: 'No articles found' });
      }

      res.status(200).json({
        article_list: listArticles,
      });
    }
  );
};

const showLatestArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articleLimit = 12;
  const query = { isPublished: true };
  const options = {
    sort: { timestamp: -1 },
    populate: [
      { path: 'author', select: 'username' },
      { path: 'comments' },
      { path: 'tags' },
    ],
    limit: articleLimit,
  };

  Article.find(query, null, options).exec(
    (err: CallbackError, listArticles: IArticleModel[] | null) => {
      if (err) {
        return next();
      }

      if (!listArticles) {
        res.status(404).json({ message: 'No articles found' });
      }

      res.status(200).json({
        article_list: listArticles,
      });
    }
  );
};

const showCertainArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const options = {
    sort: { timestamp: -1 },
    populate: [
      { path: 'author', select: 'username' },
      { path: 'comments' },
      { path: 'tags' },
    ],
  };

  Article.findById(id, null, options).exec(
    (err: CallbackError, article: IArticleModel | null) => {
      if (err) {
        return next();
      }

      if (!article) {
        res.status(404).json({ message: 'Article not found' });
      }

      res.status(200).json({
        article: article,
      });
    }
  );
};

const getRandomArticleId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Article.aggregate([
    { $match: { isPublished: true } },
    { $sample: { size: 1 } },
  ]).exec((err: CallbackError, article: IArticleModel[]) => {
    if (err) {
      return next(err);
    }

    if (!article.length) {
      return res.status(404).json({ message: 'No published article found' });
    }

    return res.status(200).json({
      articleId: article[0]._id,
    });
  });
};

const showUnpublishedArticles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = { isPublished: false };
  const options = {
    sort: { timestamp: -1 },
    populate: [
      { path: 'author', select: 'username' },
      { path: 'comments' },
      { path: 'tags' },
    ],
  };

  Article.find(query, null, options).exec(
    (err: CallbackError, listArticles: IArticleModel[] | null) => {
      if (err) {
        return next();
      }

      if (!listArticles) {
        res.status(404).json({ message: 'No articles found' });
      }

      res.status(200).json({
        article_list: listArticles,
      });
    }
  );
};

const createArticle = [
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
  body('content', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('tags.*').escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const article = new Article({
      author: req.user,
      title: req.body.title,
      content: req.body.content,
      timestamp: Date.now(),
      tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
      comments: [],
      isPublished: req.body.isPublished,
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
            if (article.tags.includes(tag._id)) {
              tag.checked = 'true';
            }
          }
          res.status(400).json({
            title: 'Failed to save article!',
            tags: results.tags,
            errors: errors.array(),
            article,
          });
        }
      );
      return;
    }

    article.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        title: 'Article saved successfully!',
        article,
      });
    });
  },
];

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  Article.findById(req.params.id).exec(function (
    err: CallbackError,
    result: IArticleModel | null
  ) {
    if (err) {
      return next(err);
    }
    Article.findByIdAndRemove(result?._id, (err: CallbackError) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ title: 'Article deleted!' });
    });
  });
};

const update_article = [
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
  body('content', 'Text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('tags.*').escape(),
  body('comments.*').escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const article = new Article({
      _id: req.params.id,
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      tags: typeof req.body.tags === 'undefined' ? [] : req.body.tags,
      comments:
        typeof req.body.comments === 'undefined' ? [] : req.body.comments,
      isPublished: req.body.isPublished === 'on' ? true : false,
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
            if (article.tags.includes(tag._id)) {
              tag.checked = 'true';
            }
          }

          res.status(400).json({
            title: 'Failed to update article!',
            tags: results.tags,
            comments: results.comments,
            errors: errors.array(),
            article,
          });
        }
      );
      return;
    }

    Article.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          author: article.author,
          title: article.title,
          content: article.content,
          tags: article.tags,
          comments: article.comments,
          isPublished: article.isPublished,
        },
      },
      { new: true, omitUndefined: true, runValidators: true },
      (err: CallbackError) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({
          title: 'Article updated successfully!',
          article,
        });
      }
    );
  },
];

export {
  showAllArticles,
  showAllArticlesAdmin,
  showLatestArticles,
  showCertainArticle,
  getRandomArticleId,
  showUnpublishedArticles,
  createArticle,
  deleteArticle,
  update_article,
};
