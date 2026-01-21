import mongoose from 'mongoose';
import { USER_ROLE, USER_STATUS } from '../types/common';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.STAFF,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      default: USER_STATUS.ACTIVE,
    },
    invitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
  status: USER_STATUS;
  invitedAt: Date;
};
