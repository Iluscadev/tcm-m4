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
  try {
    const users = await ListAllService();

    return response.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export const userListOneController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await userListOneService(id);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
};

export const createDataController = async (req: Request, res: Response) => {
  try {
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
    });
    return res.status(201).send(newData);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
  }
};

export const updatePersonalController = async (req: Request, res: Response) => {
  try {
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
    });
    return res.status(201).json({
      message: "User updated",
      personal: personalUpdated,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        status: "error",
        message: err.message,
      });
    }
  }
};
