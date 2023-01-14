import mongoose, { Schema, Types, Document } from 'mongoose';

export interface IPost {
  author: Types.ObjectId;
  title: string;
  content: string;
  timestamp: Date;
  tags: Types.ObjectId[];
  comments: Types.ObjectId[];
  isPublished: boolean;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },

    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    isPublished: { type: Boolean, required: true, default: false },
  },

  { versionKey: false }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
