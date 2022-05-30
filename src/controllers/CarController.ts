import { NextFunction, Request, Response } from 'express';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';
import ValidRequest from '../schema/ValidRequest';

export interface RequestWithBody extends Request {
  body: Car;
}

export default class CarController {
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

    const validRequest = new ValidRequest();

    validRequest.validIdLength(id, next);

    const car = await this._CarService.readOne(id);

    validRequest.objectNotFound(car, next);

    return res.status(200).json(car);
  };

  update = async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;

    const validRequest = new ValidRequest();

    validRequest.validIdLength(id, next);
    
    const car = await this._CarService.update(id, { ...body });

    validRequest.objectNotFound(car, next);
    
    return res.status(200).json(car);
  };
}
