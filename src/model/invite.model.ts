import mongoose from 'mongoose';
import { USER_ROLE } from '../types/common';

const inviteSchema = new mongoose.Schema(
  {
    email: String,
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.STAFF,
    },
    token: String,
    expiresAt: Date,
    acceptedAt: Date,
  },
  { timestamps: true },
);

export const Invite = mongoose.model('Invite', inviteSchema);
export type InviteDocument = mongoose.Document & {
  email: string;
  role: USER_ROLE;
  token: string;
  expiresAt: Date;
  acceptedAt: Date;
};
