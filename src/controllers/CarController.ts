import { NextFunction, Request, Response } from 'express';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';
import HttpException from '../schema/HttpException';

export interface RequestWithBody extends Request {
  body: Car;
}

export default class CarController {
  static _httpException: HttpException;

  constructor(
    private _CarService = new CarService(),
    private _route = '/cars',
  ) {}

  get route() { return this._route; }

  create = async (req: RequestWithBody, res: Response) => {
    const { body } = req;
    
    const car = await this._CarService.create({ ...body });
    
    return res.status(201).json(car);
  };

  read = async (req: Request, res: Response) => {
    const cars = await this._CarService.read();

    return res.status(200).json(cars);
  };

  readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return next(
        new HttpException(400, 'Id must have 24 hexadecimal characters'),
      );
    }

    const car = await this._CarService.readOne(id);

    if (!car) {
      return next(new HttpException(404, 'Object not found'));
    }

    return res.status(200).json(car);
  };
}
