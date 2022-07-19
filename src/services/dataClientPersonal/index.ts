import { DataClientPersonal } from "../../entities/dataClientPersonal.entity";
import AppDataSource from "../../data-source";
import { IDataRequest, IDataResponse } from "../../interfaces/data";
import { hash } from "bcryptjs"
import Address from "../../entities/address.entity";

export const ListAllService = async () => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = userRepository.find();

  return users;
};

export const userListOneService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createDataService = async ({name, email, age, password, phone_number ,adm, plan, checkin, checkout, lock_number, street, number, cep ,town, state}: IDataRequest) => {
  const userRepository = AppDataSource.getRepository(DataClientPersonal);

  const users = await userRepository.find();

  const hashedPassword = await hash(password, 10);

  const addressRepository = AppDataSource.getRepository(Address)

  //verificação de enaiul já cadastrado
  const emailAlreadyExisty = users.find((user) => user.email === email);

  //se o email for repetido forçamos um  erro
  if (emailAlreadyExisty) {
    throw new Error("Email already existy");
  }

  const address = new Address()
  address.street = street
  address.number = number
  address.cep = cep
  address.town = town
  address.state = state

  addressRepository.create(address)
  await addressRepository.save(address)
  
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
  data.addresses = [address]

  //adionando ao DB
  userRepository.create(data)
  await userRepository.save(data)
  
  //Criando uma resposta com chanes especificas
  const dataResponse:IDataResponse = {
      id: data.id,
      name,
      email,
      age,
      status: data.status,
      street: address.street,
      number: address.number,
      town: address.town,
      state: address.state
  }

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
    plan,
    checkin,
    checkout,
    lock_number,
  }: IDataRequest
) => {
  const personalRepository = AppDataSource.getRepository(DataClientPersonal);
  const personal = await personalRepository.findOne({ where: { id } });
  const hashedPassword = await hash(password, 10);

  if (!personal) {
    throw new Error("User not found.");
  }

  if (!name) {
    name = personal.name;
  }

  if (!email) {
    email = personal.email;
  }

  if (!age) {
    age = personal.age;
  }

  if (!password) {
    password = personal.password;
  } else {
    password = hashedPassword;
  }

  if (!phone_number) {
    phone_number = personal.phone_number;
  }

  if (!plan) {
    plan = personal.plan;
  }

  if (!checkin) {
    checkin = personal.checkin;
  }

  if (!checkout) {
    checkout = personal.checkout;
  }

  if (!lock_number) {
    lock_number = personal.lock_number;
  }

  const updatedPersonal = {
    id: personal.id,
    name: name,
    email: email,
    age: age,
    password: password,
    phone_number: phone_number,
    plan: plan,
    checkin: checkin,
    checkout: checkout,
    lock_number: lock_number,
    created_at: personal.created_at,
    updated_at: new Date(),
  };

  await personalRepository.update(personal!.id, updatedPersonal);

  return updatedPersonal;
};
