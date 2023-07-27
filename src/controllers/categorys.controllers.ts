import { Request, Response } from "express";
import {
  TCategoryRequest,
  TCategoryReturn,
} from "../interfaces/categorys.interfaces";
import { createCategory } from "../services/categories/createCategory.services";
import { readCategoriesServices } from "../services/categories/readCategories.services";
import { readRealEstateWithCategoryIdServices } from "../services/realEsstate/readRealEstateWithCategoryId.services";

export const createCategoryControllers = async (
  req: Request,
  res: Response
) => {
  const categoryReq: TCategoryRequest = req.body;

  const categoryReturn = await createCategory(categoryReq);

  return res.status(201).json(categoryReturn);
};

export const readCategoryControllers = async (req: Request, res: Response) => {
  const allCategories: TCategoryReturn[] = await readCategoriesServices();

  return res.status(200).json(allCategories);
};
export const readRealEstatesWithCategoryIdControllers = async (
  req: Request,
  res: Response
) => {
  const categoryId = Number(req.params.id);

  const realEstateReturn = await readRealEstateWithCategoryIdServices(
    categoryId
  );

  return res.status(200).json(realEstateReturn);
};
