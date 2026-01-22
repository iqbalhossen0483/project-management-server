import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserDesignation } from '../../models/User';

export interface JwtUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: UserDesignation;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & JwtUser;
      accessToken?: string;
      refreshToken?: string;
    }
  }
}
