import mongoose, { Schema, Types, Document } from 'mongoose';

export interface IPost {
  title: string;
  text: string;
  timestamp: Date;
  image?: {
    data: Buffer;
    contentType: String;
  };
  tags: Types.ObjectId[];
  comments: Types.ObjectId[];
  isPublished: boolean;
}

export interface IPostModel extends IPost, Document {}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    image: {
      data: Buffer,
      contentType: String,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { versionKey: false }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
