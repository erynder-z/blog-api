import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment {
  parentPost: Types.ObjectId;
  author: string;
  text: string;
  timestamp: Date;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema(
  {
    parentPost: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICommentModel>('Comment', CommentSchema);
