import { Document, Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { Model as ModelInterface } from '../interfaces/ModelInterface';

export interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel implements ModelInterface<Car> {
  constructor(private _model = createModel('Car', carSchema)) {}

  async create(obj: Car): Promise<Car> {
    const car = await this._model.create({ ...obj });
  
    return car;
  }

  get model() {
    return this._model;
  }

  async read(): Promise<Car[]> {
    const cars = await this._model.find();

    return cars;
  }

  async readOne(id_: string): Promise<Car | null> {
    const car = await this._model.findById(id_);

    return car;
  }

  async update(id_: string, obj: Car): Promise<Car | null> {
    const car = await this
      ._model
      .findByIdAndUpdate(id_, { ...obj }, { new: true });

    return car;
  }

  // static delete(id_: string): Promise<Car | null> {
  //   console.log(id_);

  //   throw new Error('Method not implemented.');
  // }
}

export default CarModel;
