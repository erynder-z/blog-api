import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface ITag {
  tag: string;
}

const tagSchema = new Schema<ITag>({
  tag: { type: String, required: true },
});

export default mongoose.model<ITag>('Tag', tagSchema);
