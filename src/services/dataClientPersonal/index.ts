
import { DataClientPersonal } from "../../entities/dataClientPersonal.entities"
import AppDataSource from "../../data-source"
import { IDataRequest, IDataResponse } from "../../interfaces/data";
import { hash } from "bcryptjs"

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


export const createDataService = async ({name, email, age, password, phone_number, adm, plan, checkin, checkout, lock_number}: IDataRequest) => {

    const userRepository = AppDataSource.getRepository(DataClientPersonal) 

    const users = await userRepository.find()

    const hashedPassword = await hash(password, 10)

    //verificação de enaiul já cadastrado 
    const emailAlreadyExisty = users.find(user => user.email ===email) 

    //se o email for repetido forçamos um  erro
    if( emailAlreadyExisty ) {
        throw new Error("Email already existy")
    }

    //usando os parametros que vamos receber lá do controller
    const data = new DataClientPersonal()
    data.name = name
    data.email = email
    data.age = age
    data.password = hashedPassword
    data.phone_number = phone_number
    data.adm = adm
    data.status = true
    data.plan = plan
    data.checkin = checkin
    data.checkout = checkout
    data.lock_number = lock_number

    //adionando ao DB
    userRepository.create(data)
    await userRepository.save(data)
    
    //Criando uma resposta com chanes especificas
    const dataResponse:IDataResponse = {
        id: data.id,
        name,
        email,
        age,
        plan,
        status: data.status,
        lock_number
    }

    return dataResponse;

}

