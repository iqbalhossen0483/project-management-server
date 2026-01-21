import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';
import statusCodes from '../config/statusCodes';

type ValidationTypes = {
  body: 'body';
  query: 'query';
  params: 'params';
};
export const validationTypes: ValidationTypes = {
  body: 'body',
  query: 'query',
  params: 'params',
};

const validationHandler = (
  schema: ZodObject,
  type: keyof ValidationTypes = 'body',
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw {
          status: statusCodes.BAD_REQUEST,
          success: false,
          message: JSON.parse(error.message)[0].message,
        };
      }
      next(error);
    }
  };
};

export default validationHandler;
