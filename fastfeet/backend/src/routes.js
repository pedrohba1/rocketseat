import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import PackageController from './app/controllers/PackageController';
import DeliveryController from './app/controllers/DeliveryController';
import ProblemController from './app/controllers/ProblemController';

import courierExists from './app/middlewares/courierExists';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

routes.post('/courier/:type', courierExists, DeliveryController.store);

routes.get('/problems/:package_id', ProblemController.show);
routes.get('/problems', ProblemController.index);
routes.post('/problems', ProblemController.store);
routes.delete('/problems/:delivery_problem_id', ProblemController.destroy);

routes.get('/couriers/:id', CourierController.show);

routes.get('/packages', PackageController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.destroy);

routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.destroy);

export default routes;
