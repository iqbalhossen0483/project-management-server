import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../config/app.config';
import statusCodes from '../config/statusCodes';

const authRoleHandler = (role: UserRole | UserRole[] = UserRole.Admin) => {
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
