import { Router } from "express";
import {
  listAddressController,
  createAddressController,
  listOneAddressController,
  updateAddressController,
} from "../controllers/addresses";
import { AuthMiddleware } from "../middlewares/verifyAuth.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdm.middleware";

const addressRoutes = Router();

addressRoutes.post("/:id", createAddressController);
addressRoutes.get(
  "/list",
  AuthMiddleware,
  listAddressController
);
addressRoutes.get(
  "/list/:id",
  AuthMiddleware,
  listOneAddressController
);
addressRoutes.patch(
  "/:id",
  AuthMiddleware,
  verifyUserIsAdmMiddleware,
  updateAddressController
);

export default addressRoutes;
