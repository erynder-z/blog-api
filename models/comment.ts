import mongoose, { Schema, Document } from 'mongoose';

export interface IComment {
  author: string;
  text: string;
  timestamp: Date;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICommentModel>('Comment', CommentSchema);
