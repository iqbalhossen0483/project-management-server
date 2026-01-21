import { NextFunction, Request, Response } from 'express';
import statusCodes from '../config/statusCodes';
import { USER_ROLE } from '../types/common';

const authRoleHandler = (role: USER_ROLE | USER_ROLE[] = USER_ROLE.ADMIN) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.user ||
      (Array.isArray(role)
        ? !role.includes(req.user.designation)
        : req.user.role !== role)
    ) {
      return res.status(statusCodes.FORBIDDEN).json({
        message: 'You do not have permission to access this resource',
      });
    }
    next();
  };
};
export default authRoleHandler;
