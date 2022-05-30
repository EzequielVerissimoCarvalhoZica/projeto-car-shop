import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

export default class CarService {
  constructor(private _CarModel = new CarModel()) {}

  async create(obj: Car): Promise<Car> {
    const car = await this._CarModel.create({ ...obj });
  
    return car;
  }

  async read(): Promise<Car[]> {
    const cars = await this._CarModel.read();

    return cars;
  }

  async readOne(id_: string): Promise<Car | null> {
    const car = await this._CarModel.readOne(id_);

    return car;
  }

  async update(id_: string, obj: Car): Promise<Car | null> {
    const car = await this._CarModel.update(id_, { ...obj });
  
    return car;
  }
}