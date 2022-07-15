import { Request, Response } from "express";
// import createDataService from "../../services/dataClientPersonal/index"

const createDataController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      age,
      password,
      phone_number,
      adm,
      status,
      plan,
      checkin,
      checkout,
      lock_number,
    } = req.body;
    const newData = await createUserService({
      name,
      email,
      age,
      password,
      phone_number,
      adm,
      status,
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

export default createDataController;
