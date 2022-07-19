import { Request, Response } from "express";
import { IJournal } from "../../interfaces/data";
import { journalCreateService } from "../../services/journals";
import { journalListService } from "../../services/journals";

export const journalCreateController = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const journal: IJournal = await journalCreateService(data)

        return res.status(201).json(journal)
    } catch (err) {
        if(err instanceof Error){
            return res.status(400).json({ message: err.message });
        }
    }
}

export const journalListController = async (req: Request, res: Response) => {
    const journalList: IJournal[] = await journalListService()

    return res.json({journalList})
}