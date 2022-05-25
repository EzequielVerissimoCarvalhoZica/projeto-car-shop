import { Request, Response, NextFunction } from 'express';
import HttpException from '../schema/HttpException';
import joiCar from '../schema/joiCar';

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const { error } = joiCar.validate({ ...body });

  if (error) {
    const [code, message] = error.message.split('|');

    return next(new HttpException(Number(code), message));
  }

  return next();
};