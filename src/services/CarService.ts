import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

export default class CarService {
  constructor(private _CarModel = new CarModel()) {}

  async create(obj: Car): Promise<Car> {
    const car = await this._CarModel.create({ ...obj });
  
    return car;
  }
}