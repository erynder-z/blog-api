import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface ITag extends Document {
  tag: string;
}

const tagSchema = new Schema<ITag>({
  tag: { type: String, required: true },
});

export default mongoose.model<ITag>('Tag', tagSchema);
