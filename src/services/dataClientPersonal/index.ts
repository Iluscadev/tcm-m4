import { DataClientPersonal } from "../../entities/dataClientPersonal.entity";
import AppDataSource from "../../data-source";
import { IDataRequest, IDataResponse } from "../../interfaces/data";
import { hash } from "bcryptjs";
import Address from "../../entities/address.entity";
import { AppError } from "../../errors/AppError";

export const ListAllService = async () => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = userRepository.find();

  return users;
};

export const userListOneService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const user = await userRepository.findOneBy({ id: id });

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
  street,
  number,
  cep,
  town,
  state,
}: IDataRequest) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = await userRepository.find();

  const hashedPassword = await hash(password, 10);

  const addressRepository = AppDataSource.getRepository(Address);

  //verificação de enaiul já cadastrado
  const emailAlreadyExisty = users.find((user) => user.email === email);

  //se o email for repetido forçamos um  erro
  if (emailAlreadyExisty) {
    throw new AppError("Email already existy");
  }

  const address = new Address();
  address.street = street;
  address.number = number;
  address.cep = cep;
  address.town = town;
  address.state = state;

  addressRepository.create(address);
  await addressRepository.save(address);

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
  data.addresses = [address];

  //adionando ao DB
  userRepository.create(data);
  await userRepository.save(data);

  //Criando uma resposta com chanes especificas
  const dataResponse: IDataResponse = {
    id: data.id,
    name,
    email,
    age,
    status: data.status,
    street: address.street,
    number: address.number,
    town: address.town,
    state: address.state,
  };

  return dataResponse;
};

export const updatePersonalService = async (
  id: string,
  {
    name,
    email,
    age,
    password,
    phone_number,
   
    
    }: IDataRequest
) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);
  const user = await userRepository.findOne({ where: { id } });
  const hashedPassword = await hash(password, 10);
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  console.log(user.name)
  
  if (!name) {
    name = user.name;
  }

  if (!email) {
    email = user.email;
  }

  if (!age) {
    age = user.age;
  }

  if (!password) {
    password = user.password;
  } else {
    password = hashedPassword;
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
