import mongoose, { Schema, Document } from 'mongoose';

export interface ITag {
  name: string;
}

export interface ITagModel extends ITag, Document {
  url(url: any): string;
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

TagSchema.virtual('url').get(function () {
  return `/api/tag/${this._id}`;
});

export default mongoose.model<ITagModel>('Tag', TagSchema);
