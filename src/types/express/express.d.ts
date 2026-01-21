import { JwtPayload } from 'jsonwebtoken';
import { UserDesignation } from '../../models/User';

export interface JwtUser {
  id: number;
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
