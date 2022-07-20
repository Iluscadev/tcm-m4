import { Router } from "express";
import {
  createDataController,
  ListAllController,
  softDeleteController,
  updatePersonalController,
  userListOneController,
} from "../controllers/dataClientPersonal";
import { AuthMiddleware } from "../middlewares/verifyAuth.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdm.middleware";

const clientsPersonalRoutes = Router();

clientsPersonalRoutes.post("/register", createDataController);

clientsPersonalRoutes.get(
  "/list",
  AuthMiddleware,
  ListAllController
);

clientsPersonalRoutes.get(
  "/list/:id",
  AuthMiddleware,
  userListOneController
);

clientsPersonalRoutes.patch("/:id", AuthMiddleware, verifyUserIsAdmMiddleware, updatePersonalController);

clientsPersonalRoutes.delete("/:id", AuthMiddleware, verifyUserIsAdmMiddleware, softDeleteController);

export default clientsPersonalRoutes;
