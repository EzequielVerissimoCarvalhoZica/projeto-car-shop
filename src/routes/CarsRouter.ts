import { Router } from 'express';
import CarController from '../controllers/CarController';
import validateCar from '../middlewares/validateCar';

export default class CarsRouter {
  public router: Router;

  constructor(
    private _validateCar = validateCar,
  ) {
    this.router = Router();
  }

  public addRoute(
    carController = new CarController(),
    route: string = carController.route,
  ) {
    this.router
      .route(`${route}/:id`)
      .get(carController.readOne)
      .put(carController.update);

    this.router
      .route(route)
      .post(this._validateCar, carController.create)
      .get(carController.read);
  }
}