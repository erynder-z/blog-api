import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Comment from '../models/comment';
import Article from '../models/article';
import Filter from 'bad-words';

const filter = new Filter();
filter.addWords(...require('badwords/array'));

async function saveComment(parentArticleId: string, commentData: any) {
  const post = await Article.findById(parentArticleId);
  if (!post) {
    throw new Error('Article not found');
  }

  const comment = new Comment({
    parentArticle: parentArticleId,
    author: filter.clean(commentData.author),
    text: filter.clean(commentData.text),
    timestamp: Date.now(),
  });

  await comment.save();
  post.comments.push(comment._id);
  await post.save();
  return { comment, post };
}

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

    try {
      const { comment, post } = await saveComment(req.params.id, req.body);
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
    await Comment.findByIdAndRemove(comment._id);
    await Article.findByIdAndUpdate(comment.parentArticle, {
      $pull: { comments: comment._id },
    });

    res.status(200).json({ title: 'Comment deleted!' });
  } catch (err) {
    next(err);
  }
};

export { createComment, deleteComment };
