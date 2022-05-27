import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel, { CarDocument } from '../../../models/CarModel';
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

const carMock = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: '628fc7176f39b697bcd474b5',
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
  describe(('Read cars'), () => {
    let response: Response;

    before(async () => {
      Sinon.stub(carModel.model, 'find').resolves(carsMock);

      response = await chai
      .request(server.getApp())
      .get('/cars')
      .then(res => res) as Response;
    });
  
    after(()=>{
      Sinon.restore();
    })
    it('Read successful return status 200', async () => {
      expect(response).to.have.status(200);
    });
    it('Read successful return cars list', async () => {
      expect(response.body).to.deep.equal(carsMock);
    });
  })
  describe(('Read car by id'), () => {
    describe(('Case successful'), () => {
      let responseSuccessful: Response;

      before(async () => {
        Sinon.stub(carModel.model, 'findById').resolves(carsMock[0]);

        responseSuccessful = await chai
        .request(server.getApp())
        .get('/cars/628fc7176f39b697bcd474b5')
        .then(res => res) as Response;
      });
  
      after(()=>{
        Sinon.restore();
      })

      it('Read successful return status 200', async () => {
        expect(responseSuccessful).to.have.status(200);
      });

      it('Read successful return car by id', async () => {
        expect(responseSuccessful.body).to.deep.equal(carMock);
      });
    });
    describe(('Case id not found'), () => {
      let idNotFound: Response;

      before(async () => {
        Sinon.stub(carModel.model, 'findById').resolves(null);

        idNotFound = await chai
        .request(server.getApp())
        .get('/cars/628fc7176f39b6975cd474b9')
        .then(res => res) as Response;
      });
  
      after(()=>{
        Sinon.restore();
      })

      it('Read failed id not found return status 404', async () => {
        expect(idNotFound).to.have.status(404);
      });

      it('Read failed id not found return message error', async () => {
        expect(idNotFound.body).to.deep.equal({ error: 'Object not found' });
      });
    });
    describe(('Case id worong'), () => {
      let worongId: Response;

      before(async () => {
        Sinon.stub(carModel.model, 'findById').resolves(carsMock[0]);

        worongId = await chai
        .request(server.getApp())
        .get('/cars/628fc7176f39b697bcd474b')
        .then(res => res) as Response;
      });

      after(()=>{
        Sinon.restore();
      })

      it('Read failed id worong return status 400', async () => {
        expect(worongId).to.have.status(400);
      });
  
      it('Read failed id worong return message error', async () => {
        expect(worongId.body).to.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
      });
    });
  })
});