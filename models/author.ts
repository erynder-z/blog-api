import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor {
  username: string;
  password: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IAuthorModel>('Author', AuthorSchema);
