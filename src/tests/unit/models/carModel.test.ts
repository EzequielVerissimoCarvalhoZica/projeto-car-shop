import { expect } from 'chai';
import mongoose, { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel, { CarDocument } from '../../../models/CarModel';

const carMock = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd474b5',
}

const carCreate = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
}

describe(('Test car model'), () => {
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

    before(() => {
      Sinon.stub(carModel, 'create').resolves(carMock)
    })

    after(() => {
      (carModel.create as Sinon.SinonStub).restore();
    })

    it('Return car created', async () => {
      const created = await carModel.create(carCreate);
      
      expect(created).to.deep.eq(carMock);
    })
  })
})