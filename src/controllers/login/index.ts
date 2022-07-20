import { Request, Response } from 'express'
import userLoginService from '../../services/login';

export const userLoginController = async (req: Request, res: Response) => {

    

        const {email, password} = req.body

        const token =  await userLoginService({email, password})
        
        return res.status(201).json({token})

    
}