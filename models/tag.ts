import mongoose, { Schema, Document } from 'mongoose';

export interface ITag {
  tag: string;
}

export interface ITagModel extends ITag, Document {}

const TagSchema: Schema = new Schema(
  {
    tag: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ITagModel>('Tag', TagSchema);
