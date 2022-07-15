import { DataClientPersonal } from "../../entities/dataClientPersonal.entities"
import AppDataSource from "../../data-source"

export const ListAllService = async () => {

    const userRepository = AppDataSource.getRepository(DataClientPersonal)

    const users = userRepository.find()

    return users
}

export const userListOneService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(DataClientPersonal) 

    const user = await userRepository.findOneBy({id: id})

    if(!user){
        throw new Error("User not found")
    }

    return user;

}

