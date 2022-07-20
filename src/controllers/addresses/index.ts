import { Request, Response } from "express";
import {
  createAddressService,
  listAddressService,
  listOneAddressService,
  updateAddressService,
} from "../../services/addresses";

export const createAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { street, number, cep, complement, town, state } = req.body;

  const newAddress = await createAddressService(id, {
    street,
    number,
    cep,
    complement,
    town,
    state,
  });

  return res.status(201).json({
    message: "Address created",
    address: newAddress,
  });
};

export const listAddressController = async (req: Request, res: Response) => {
  const addressesList = await listAddressService();

  return res.status(200).json(addressesList);
};

export const listOneAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const address = await listOneAddressService(id);

  return res.status(200).json(address);
};

export const updateAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { street, number, cep, complement, town, state } = req.body;
  const updatedAddress = await updateAddressService(id, { street, number, cep, complement, town, state });

  return res.status(200).json({
    message: "Address updated",
    updated_address: updatedAddress
  })
};
