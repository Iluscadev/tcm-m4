import { DataClientPersonal } from "../../entities/dataClientPersonal.entity";
import AppDataSource from "../../data-source";
import { IDataRequest, IDataResponse } from "../../interfaces/data";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

export const ListAllService = async () => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = userRepository.find({
    relations: {
      avaliations: true,
      journals: true,
      addresses: true
    }
  });

  return users;
};

export const userListOneService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const user = await userRepository.findOne({ 
    relations: {
      avaliations: true,
      journals: true,
      addresses: true
    }, 
    where: {
      id: id
    } 
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const createDataService = async ({
  name,
  email,
  age,
  password,
  phone_number,
  adm,
  plan,
  checkin,
  checkout,
  lock_number,
}: IDataRequest) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = await userRepository.find();

  const hashedPassword = await hash(password, 10);

  //verificação de enaiul já cadastrado
  const emailAlreadyExisty = users.find((user) => user.email === email);

  //se o email for repetido forçamos um  erro
  if (emailAlreadyExisty) {
    throw new AppError("Email already existy");
  }

  //usando os parametros que vamos receber lá do controller
  const data = new DataClientPersonal();
  data.name = name;
  data.email = email;
  data.age = age;
  data.password = hashedPassword;
  data.phone_number = phone_number;
  data.adm = adm;
  data.status = true;
  data.plan = plan;
  data.checkin = checkin;
  data.checkout = checkout;
  data.lock_number = lock_number;

  //adionando ao DB
  userRepository.create(data);
  await userRepository.save(data);

  //Criando uma resposta com chanes especificas
  const dataResponse: IDataResponse = {
    id: data.id,
    name,
    email,
    age,
    status: data.status
  };

  return dataResponse;
};

export const updatePersonalService = async (
  id: string,
  { name, email, age, password, phone_number }: IDataRequest
) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!name) {
    name = user.name;
  }

  if (!email) {
    email = user.email;
  }

  if (!age) {
    age = user.age;
  }

  if (password) {
    password = await hash(password, 10);
  } else {
    password = user.password;
  }

  if (!phone_number) {
    phone_number = user.phone_number;
  }

  const updatedPersonal = {
    id: user.id,
    name: name,
    email: email,
    age: age,
    password: password,
    phone_number: phone_number,
    created_at: user.created_at,
    updated_at: new Date(),
  };

  await userRepository.update(user!.id, updatedPersonal);

  return updatedPersonal;
};

export const softDeleteService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(DataClientPersonal)

    const user = await userRepository.findOneBy({id: id})

    if(!user){
        throw new AppError("User not found", 404)
    }

    if(!user.status){
        throw new AppError("Inactive user")
    }

    user.status = false
    await userRepository.save(user)

}