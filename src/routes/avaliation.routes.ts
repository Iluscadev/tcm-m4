import { Router } from "express";
import { createAvaliationController, listAvaliationController, listOneAvaliationController, updateAvaliationController } from "../controllers/avaliations";
import { AuthMiddleware } from "../middlewares/verifyAuth.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdm.middleware";

const avaliantionRoutes = Router();

avaliantionRoutes.post("/:id", createAvaliationController)
avaliantionRoutes.get("/list", AuthMiddleware, listAvaliationController)
avaliantionRoutes.get("/list/:id", AuthMiddleware, listOneAvaliationController)
avaliantionRoutes.patch("/:id", AuthMiddleware, verifyUserIsAdmMiddleware, updateAvaliationController)

export default avaliantionRoutes;
