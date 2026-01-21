import { NextFunction, Request, Response } from 'express';
import statusCodes from '../config/statusCodes';

const authRoleHandler = (role: USER_ROLE | USER_ROLE[] = USER_ROLE.ADMIN) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.user ||
      (Array.isArray(role)
        ? !role.includes(req.user.designation)
        : req.user.designation !== role)
    ) {
      return res.status(statusCodes.FORBIDDEN).json({
        message: 'You do not have permission to access this resource',
      });
    }
    next();
  };
};
export default authRoleHandler;
