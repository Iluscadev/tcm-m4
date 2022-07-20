import { Request, Response } from "express";
import {createAvaliationService, listAvaliationService} from "../../services/avaliations";

export const createAvaliationController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
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
    diameter
  } = req.body;

  const newAvaliation = await createAvaliationService(id, {
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
    diameter
  })

  return res.status(201).json({
    message: "Avaliation created",
    avaliation: newAvaliation
  })
};


export const listAvaliationController = async (req: Request, res: Response) => {
  const avaliations = await listAvaliationService()
  return res.status(200).json(avaliations)
}
