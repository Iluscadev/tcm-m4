import { Request, Response } from "express";
import { ListAllService, userListOneService } from "../../services/dataClientPersonal";




export const ListAllController = async (request:Request, response: Response) => {

    try {

        const users = await ListAllService();

        return response.status(200).json(users);

    } catch (error) {
        if(error instanceof Error) {
            return response.status(400).json({
                'error': error.name,
                'message': error.message
            })
        }
    }
}

export const userListOneController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const user = await userListOneService(id)

        return res.status(200).json(user)

    } catch (error) {

        if(error instanceof Error){

            return res.status(404).json({

                message: error.message

            })
        }
    }
}