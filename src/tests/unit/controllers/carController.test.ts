import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
import server from '../../../server';

chai.use(chaiHttp);

const { expect } = chai;

const carCreate = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
}

const carMock = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd474b8',
}

describe('Test car controller', () => {
  const carModel = new CarModel();

  describe(('Create car'), () => {
    let response: Response;

    before(async () => {
      Sinon.stub(carModel.model, 'create').resolves(carMock);

      response = await chai
      .request(server.getApp())
      .post('/cars')
      .send(carCreate)
      .then(res => res) as Response;
    });
  
    after(()=>{
      Sinon.restore();
    })
    it('Create successful return status 201', async () => {
      expect(response).to.have.status(201);
    });
    it('Create successful return car created', async () => {
      expect(response.body).to.deep.equal(carMock);
    });
  })

});