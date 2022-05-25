import CarsRouter from './routes/CarsRouter';
import App from './app';

// import CarController from './controllers/CarController';

const server = new App();

// const carController = new CarController();

const carsRouter = new CarsRouter();
carsRouter.addRoute();

server.addRouter(carsRouter.router);

export default server;
