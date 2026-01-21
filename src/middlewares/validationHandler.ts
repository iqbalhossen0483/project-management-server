import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
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
  schema: joi.ObjectSchema,
  type: keyof ValidationTypes = 'body',
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      throw {
        status: statusCodes.BAD_REQUEST,
        message: error.details[0].message,
        success: false,
      };
    }
    next();
  };
};

export default validationHandler;
