import { Document, Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { Model as ModelInterface } from '../interfaces/ModelInterface';

interface CarDocument extends Car, Document {}

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

  // static read(): Promise<Car[]> {
  //   throw new Error('Method not implemented.');
  // }

  // static readOne(id_: string): Promise<Car | null> {
  //   console.log(id_);
  //   throw new Error('Method not implemented.');
  // }

  // static update(id_: string, obj: Car): Promise<Car | null> {
  //   console.log(id_, obj);
    
  //   throw new Error('Method not implemented.');
  // }

  // static delete(id_: string): Promise<Car | null> {
  //   console.log(id_);

  //   throw new Error('Method not implemented.');
  // }
}

export default CarModel;
