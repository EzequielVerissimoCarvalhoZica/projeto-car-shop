import { NextFunction } from 'express';
import { Car } from '../interfaces/CarInterface';
import HttpException from './HttpException';
import validIdLength from './validIdLength';

export default class ValidRequest {
  private _message: string;

  private _status: number;

  constructor() {
    this._message = '';
    this._status = 0;
  }

  validEmptyObj(body: object, next: NextFunction) {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      this._message = 'Body cannot be empty';
      this._status = 400;

      return this.response(next);
    }
  }

  validIdLength(id: string, next: NextFunction) {
    if (!validIdLength(id)) {
      this._message = 'Id must have 24 hexadecimal characters';
      this._status = 400;

      return this.response(next);
    }
  }

  objectNotFound(car: Car | null, next: NextFunction) {
    if (!car) {
      this._message = 'Object not found';
      this._status = 404;

      return this.response(next);
    }
  }

  response(next: NextFunction) {
    return next(new HttpException(this._status, this._message));
  }
}