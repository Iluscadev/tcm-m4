import AppDataSource from "../../data-source";
import Avaliation from "../../entities/avaliation.entity";
import { DataClientPersonal } from "../../entities/dataClientPersonal.entity";
import { AppError } from "../../errors/AppError";
import { IAvaliationCreate } from "../../interfaces/data";

export const createAvaliationService = async (
  id: string,
  {
    wheight,
    height,
    neck,
    waist,
    bust,
    hip,
    arm_right,
    arm_left,
    leg_left,
    leg_right,
    cardio_freq,
    circumference,
    diameter,
  }: IAvaliationCreate
): Promise<Avaliation> => {
  const avaliationRepository = AppDataSource.getRepository(Avaliation);

  const dataRepository = AppDataSource.getRepository(DataClientPersonal);

  const clientPersonal = await dataRepository.findOneBy({ id: id });

  console.log(clientPersonal);

  if (!clientPersonal) {
    throw new AppError("Client or Personal not found", 404);
  }

  const avaliation = avaliationRepository.create({
    wheight,
    height,
    neck,
    waist,
    bust,
    hip,
    arm_right,
    arm_left,
    leg_left,
    leg_right,
    cardio_freq,
    circumference,
    diameter,
    created_at: new Date(),
    updated_at: new Date(),
    data_client_personal: [clientPersonal],
  });

  const newAvaliation = await avaliationRepository.save(avaliation);

  console.log(newAvaliation);

  return newAvaliation;
};

export const listAvaliationService = async () => {
  const avaliationRepository = AppDataSource.getRepository(Avaliation);
  const avaliations = await avaliationRepository.find({
    relations: {
      data_client_personal: true,
    },
  });

  return avaliations;
};

export const updateAvaliationService = async (
  id: string,
  {
    wheight,
    height,
    neck,
    waist,
    bust,
    hip,
    arm_right,
    arm_left,
    leg_left,
    leg_right,
    cardio_freq,
    circumference,
    diameter,
  }: IAvaliationCreate
) => {
  const avaliationRepository = AppDataSource.getRepository(Avaliation);
  const avaliation = await avaliationRepository.findOneBy({ id });

  if (!avaliation) {
    throw new AppError("Avaliation not found", 404);
  }

  const updatedAvaliation = avaliationRepository.create({
    wheight,
    height,
    neck,
    waist,
    bust,
    hip,
    arm_right,
    arm_left,
    leg_left,
    leg_right,
    cardio_freq,
    circumference,
    diameter,
    updated_at: new Date(),
  });

  await avaliationRepository.update(id, updatedAvaliation);
  const update = await avaliationRepository.findOneBy({ id });

  return update;
};


export const listOneAvaliationService = async (id: string) => {
  const avaliationRepository = AppDataSource.getRepository(Avaliation);
  const avaliation = await avaliationRepository.findOne({
    relations: { data_client_personal: true },
    where: { id: id },
  });

  if (!avaliation) {
    throw new AppError("Avaliation not found", 404);
  }

  return avaliation;
}

export const deleteAvaliationService = async (id: string) => {
  const avaliationRepository = AppDataSource.getRepository(Avaliation)
  const avaliation = await avaliationRepository.findOneBy({id})

  if(!avaliation){
    throw new AppError("Avaliation not found", 404)
  }

  if(!avaliation.status){
    throw new AppError("Inactive avaliation")
  }

  avaliation.status = false

  await avaliationRepository.save(avaliation)
}