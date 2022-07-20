import { Request, Response } from "express";
import {
  createDataService,
  ListAllService,
  updatePersonalService,
  userListOneService,
} from "../../services/dataClientPersonal";

export const ListAllController = async (
  request: Request,
  response: Response
) => {
  const users = await ListAllService();

  return response.status(200).json(users);
};

export const userListOneController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await userListOneService(id);

  return res.status(200).json(user);
};

export const createDataController = async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  const newData = await createDataService({
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
  });
  return res.status(201).send(newData);
};

export const updatePersonalController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
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
  } = req.body;
  const personalUpdated = await updatePersonalService(id, {
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
  });
  return res.status(201).json({
    message: "User updated",
    personal: personalUpdated,
  });
};
