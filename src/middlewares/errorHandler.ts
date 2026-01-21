import { NextFunction, Request, Response } from 'express';
import statusCodes from '../config/statusCodes';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);
  res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
};
