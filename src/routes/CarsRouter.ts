import { Router } from 'express';
import CarController from '../controllers/CarController';
import validateCar from '../middlewares/validateCar';

export default class CarsRouter {
  public router: Router;

  constructor(
    private _validateCar = validateCar,
  ) {
    this.router = Router();
    // this.intializeRoutes();
  }

  public addRoute(
    carController = new CarController(),
    route: string = carController.route,
  ) {
    this.router
      .route(route)
      .post(this._validateCar, carController.create);
  }

  // intializeRoutes = () => {
  //   this.router
  //     .route(this._route)
  //     .post(this._validateCar, this._CarController.create);
  // };
}