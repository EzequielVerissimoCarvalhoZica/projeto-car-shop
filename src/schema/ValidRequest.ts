import { NextFunction } from 'express';
import { Car } from '../interfaces/CarInterface';
import HttpException from './HttpException';

export default class ValidRequest {
  private _message: string;

  private _status: number;

  constructor() {
    this._message = '';
    this._status = 0;
  }

  validIdLength(id: string, next: NextFunction) {
    if (!ValidRequest.validIdLength(id)) {
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

  static validIdLength(id: string) {
    if (id.length !== 24) return false;
  
    return true;
  }

  response(next: NextFunction) {
    return next(new HttpException(this._status, this._message));
  }
}