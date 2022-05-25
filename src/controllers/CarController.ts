import { Request, Response } from 'express';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

interface RequestWithBody extends Request {
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
}
