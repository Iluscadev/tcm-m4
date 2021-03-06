import { Request, Response } from "express";
import { IJournal } from "../../interfaces/data";
import { journalCreateService, journalDeleteService, journalListOneService, journalListService, journalUpdateService } from "../../services/journals";


export const journalCreateController = async (req: Request, res: Response) => {
 
    const id = req.params.id

    const {exercise, time, repetitions} = req.body

    const journal = await journalCreateService(id,{exercise, time, repetitions})

    return res.status(201).json(journal)
}

export const journalListController = async (req: Request, res: Response) => {
    const journalList: IJournal[] = await journalListService()

    return res.json({journalList})
}

export const journalUpdateController = async  (req: Request, res: Response) => {

    const id = req.params.id

    const {exercise, time, repetitions} = req.body
        
    const journal = await journalUpdateService(id,{exercise, time, repetitions })

    return res.status(200).json({message: 'journal Update', journal})
}

export const journalListOneController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const address = await journalListOneService(id);

    return res.status(200).json(address);
}

export const journalDeleteController = async (req: Request, res: Response) => {
    const { id } = req.params;
    await journalDeleteService(id)

    return res.status(204).send()
}
