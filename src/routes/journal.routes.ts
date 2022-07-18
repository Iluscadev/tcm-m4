import { Router } from "express";
import { journalCreateController, journalListController } from "../controllers/journals";

const journalRoutes = Router()

journalRoutes.post('/journal', journalCreateController);
journalRoutes.get('/journal/list', journalListController)

export default journalRoutes