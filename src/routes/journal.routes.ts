import { Router } from "express";
import { journalCreateController, journalListController, journalUpdateController } from "../controllers/journals";

const journalRoutes = Router();

journalRoutes.post('/journal/:id', journalCreateController);

journalRoutes.get('/journal/list', journalListController)

journalRoutes.patch('/journal/:id', journalUpdateController)

export default journalRoutes;
