import { expect } from 'chai';
import mongoose, { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel, { CarDocument } from '../../../models/CarModel';
import CarService from '../../../services/CarService';

const carMock = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd474b8',
}

const carsMock = [{
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd474b5',
},
{
  model: 'Audi TT',
  year: 2020,
  color: 'blue',
  buyValue: 286127,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd473a2',
}] as (CarDocument & { _id: any; })[]

const carCreate = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
}

describe(('Test car service'), () => {
  const mongooseModelMock = {
    create: (car:any) => {
      return {
        ...car,
        _id: { $id: 'any'}
      }
    }
  } as Model<CarDocument>;

  describe(('Create car'), () => {
    const carModel = new CarModel(mongooseModelMock);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'create').resolves({...carMock})
    })
    after(() => {
      (carModel.create as Sinon.SinonStub).restore();
    })
    it('Return car created', async () => {
      const created = await carService.create(carMock);

      expect(created).to.deep.eq(carMock);
    })
  })
  describe(('Read all cars'), () => {
    const carModel = new CarModel(mongooseModelMock);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'read').resolves(carsMock)
    })
    after(() => {
      (carModel.read as Sinon.SinonStub).restore();
    })
    it('Return cars', async () => {
      const cars = await carService.read();

      expect(cars).to.deep.eq(carsMock);
    })
  })
  describe(('Read car by id'), () => {
    const carModel = new CarModel(mongooseModelMock);
    const carService = new CarService(carModel);

    before(() => {
      Sinon.stub(carModel, 'readOne').resolves(carMock)
    })
    after(() => {
      (carModel.readOne as Sinon.SinonStub).restore();
    })
    it('Return car by id', async () => {
      const car = await carService.readOne('628fc7176f39b697bcd474b8');

      expect(car).to.deep.eq(carMock);
    })
  })
})