import * as mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose';

interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

export default userModel;
