import { Router } from 'express';
import CarController from '../controllers/CarController';
import validateCreateCar from '../middlewares/validateCreateCar';
import validateUpdateCar from '../middlewares/validateUpdateCar';

export default class CarsRouter {
  public router: Router;

  constructor(
    private _validateCreateCar = validateCreateCar,
    private _validateUpdateCar = validateUpdateCar,
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
      .put(this._validateUpdateCar, carController.update);

    this.router
      .route(route)
      .post(this._validateCreateCar, carController.create)
      .get(carController.read);
  }
}