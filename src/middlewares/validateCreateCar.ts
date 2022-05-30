import { Request, Response, NextFunction } from 'express';
import HttpException from '../schema/HttpException';
import joiCreateCar from '../schema/joiCreateCar';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const { error } = joiCreateCar.validate({ ...body });

  if (error) {
    const [code, message] = error.message.split('|');
    const propty = error?.details[0].path[0];

    return next(new HttpException(Number(code), propty + message));
  }

  return next();
};