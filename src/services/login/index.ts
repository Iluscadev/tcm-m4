import { DataClientPersonal } from "../../entities/dataClientPersonal.entities"
import { IUserLogin } from "../../interfaces/data"
import AppDataSource from "../../data-source"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken";

const userLoginService = async ({email, password}: IUserLogin) => {

    const userRepository = AppDataSource.getRepository(DataClientPersonal) 


    const account = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if (!account) {
        throw new Error("Account not found")
    }

    const passwordMatch = await compare(password, account.password)

    if(!passwordMatch){
        throw new Error("Wrong email/password")
    } 

 

    const token = jwt.sign({
        id: account.id,
        adm: account.adm
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: "1h"
    }
)

return token

}

export default userLoginService