import { Router } from "express";
import { journalCreateController, journalListController, journalListOneController, journalUpdateController } from "../controllers/journals";
import { AuthMiddleware } from "../middlewares/verifyAuth.middleware";
import verifyUserIsAdmMiddleware from "../middlewares/verifyUserIsAdm.middleware";

const journalRoutes = Router();

journalRoutes.post('/:id', journalCreateController);

journalRoutes.get('/list', AuthMiddleware, journalListController)

journalRoutes.get('/list/:id', AuthMiddleware, journalListOneController)

journalRoutes.patch('/:id', AuthMiddleware, verifyUserIsAdmMiddleware, journalUpdateController)

export default journalRoutes;
