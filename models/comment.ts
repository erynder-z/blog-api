import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment {
  parentArticle: Types.ObjectId;
  author: string;
  text: string;
  timestamp: Date;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema(
  {
    parentArticle: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICommentModel>('Comment', CommentSchema);
