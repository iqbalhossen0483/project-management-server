import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import config from '../config/config';
import statusCodes from '../config/statusCodes';
import { JwtUser } from '../types/express/express';

export const authenticationHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw {
        status: statusCodes.UNAUTHORIZED,
        message: 'You are not authorized to access this resource',
      };
    }
    const decoded = verify(token, config.tokenSecret);

    req.user = decoded as JwtPayload & JwtUser;
    next();
  } catch (error) {
    next(error);
  }
};
