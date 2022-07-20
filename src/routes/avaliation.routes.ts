import { Router } from "express";
import { createAvaliationController, listAvaliationController } from "../controllers/avaliations";

const avaliantionRoutes = Router();

avaliantionRoutes.post("/:id", createAvaliationController)
avaliantionRoutes.get("/list", listAvaliationController)

export default avaliantionRoutes;
