import { Router } from "express";
import { userLoginController } from "../controllers/login";

const loginRoutes = Router()

loginRoutes.post("/", userLoginController)

export default loginRoutes