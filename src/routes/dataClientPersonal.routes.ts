import { Router } from "express";
import { createDataController, ListAllController, userListOneController } from "../controllers/dataClientPersonal";
import { AuthMiddleware } from "../middlewares/verifyAuth.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdm.middleware";

const clientsPersonalRoutes = Router();

clientsPersonalRoutes.post("/register", createDataController);

clientsPersonalRoutes.get('/users', AuthMiddleware, verifyUserIsAdmMiddleware, ListAllController);

clientsPersonalRoutes.get('/clients/:id', AuthMiddleware, verifyUserIsAdmMiddleware, userListOneController);
export default clientsPersonalRoutes
