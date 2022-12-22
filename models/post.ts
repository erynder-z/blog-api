import * as mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

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

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  image: {
    data: Buffer,
    contentType: String,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<IPost>('Post', postSchema);
