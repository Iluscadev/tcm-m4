import { Router } from "express";
import { createDataController, ListAllController, userListOneController } from "../controllers/dataClientPersonal";

const clientsPersonalRoutes = Router()

clientsPersonalRoutes.post('/register', createDataController);

clientsPersonalRoutes.get('/users', ListAllController);

clientsPersonalRoutes.get('/clients/:id', userListOneController);
export default clientsPersonalRoutes