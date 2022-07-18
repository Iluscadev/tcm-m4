import { Router } from "express";
import { createDataController, ListAllController, userListOneController } from "../controllers/dataClientPersonal";
import { userLoginController } from "../controllers/login";

const clientsPersonalRoutes = Router()

clientsPersonalRoutes.post('/login', userLoginController);

clientsPersonalRoutes.post('/register', createDataController);

clientsPersonalRoutes.get('/users', ListAllController);

clientsPersonalRoutes.get('/clients/:id', userListOneController);
export default clientsPersonalRoutes