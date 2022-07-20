import { Router } from "express";
import { createAvaliationController, listAvaliationController, updateAvaliationController } from "../controllers/avaliations";

const avaliantionRoutes = Router();

avaliantionRoutes.post("/:id", createAvaliationController)
avaliantionRoutes.get("/list", listAvaliationController)
avaliantionRoutes.get("/list/:id", listAvaliationController)
avaliantionRoutes.patch("/:id", updateAvaliationController)

export default avaliantionRoutes;
