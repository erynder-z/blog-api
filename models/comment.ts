import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  author: string;
  text: string;
  timestamp: Date;
}

const commentSchema = new Schema<IComment>({
  author: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IComment>('Comment', commentSchema);
