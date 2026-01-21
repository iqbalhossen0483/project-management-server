import mongoose from 'mongoose';
import { USER_ROLE } from '../types/common';

const inviteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.STAFF,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Invite = mongoose.model('Invite', inviteSchema);
export type InviteDocument = mongoose.Document & {
  email: string;
  role: USER_ROLE;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date | null;
};
