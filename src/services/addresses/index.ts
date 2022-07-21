import AppDataSource from "../../data-source";
import Address from "../../entities/address.entity";
import { DataClientPersonal } from "../../entities/dataClientPersonal.entity";
import { AppError } from "../../errors/AppError";
import { ICreateAddress } from "../../interfaces/data";

export const createAddressService = async (
  id: string,
  { street, number, cep, complement, town, state }: ICreateAddress
) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const dataRepository = AppDataSource.getRepository(DataClientPersonal);

  const data = await dataRepository.findOneBy({ id: id });

  if (!data) {
    throw new AppError("Client or Personal not found", 404);
  }

  const address = addressRepository.create({
    street,
    number,
    cep,
    complement,
    town,
    state,
    data_client_personal: [data],
  });

  const newAddress = await addressRepository.save(address);

  return newAddress;
};

export const listAddressService = async () => {
  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = await addressRepository.find();

  return addresses;
};

export const listOneAddressService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const address = await addressRepository.findOne({
    relations: { data_client_personal: true },
    where: { id: id },
  });

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  return address;
};

export const updateAddressService = async (
  id: string,
  { street, number, cep, complement, town, state }: ICreateAddress
) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const address = await addressRepository.findOneBy({ id });

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  const update = addressRepository.create({
    street,
    number,
    cep,
    complement,
    town,
    state,
  });

  await addressRepository.update(id, update);

  const updatedAddress = await addressRepository.findOneBy({ id });

  return updatedAddress;
};

export const deleteAddressService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Address)
  const address = await addressRepository.findOneBy({id})

  if(!address){
    throw new AppError("Address not found", 404)
  }

  if(!address.status){
    throw new AppError("Inactive address")
  }

  address.status = false

  await addressRepository.save(address)
}
