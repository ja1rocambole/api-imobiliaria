import { Request, Response } from "express";
import { createRealEstateServices } from "../services/realEsstate/createRealEstate.services";
import {
  TRealEstateRequest,
  TRealEstateReturn,
  TRealEstateWithOutcategoryReturn,
} from "../interfaces/realEstate.interfaces";
import { readRealEstateServices } from "../services/realEsstate/readRealEstate.services";

export const createRealEstateControllers = async (
  req: Request,
  res: Response
) => {
  const realEstateReq: TRealEstateRequest = req.body;

  const realEstateReturn: TRealEstateReturn = await createRealEstateServices(
    realEstateReq
  );

  return res.status(201).json(realEstateReturn);
};
export const readRealEstateControllers = async (
  req: Request,
  res: Response
) => {
  const manyRealEstatesReturn: TRealEstateWithOutcategoryReturn[] =
    await readRealEstateServices();

  return res.status(200).json(manyRealEstatesReturn);
};
