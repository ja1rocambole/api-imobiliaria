import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  TCategoryRequest,
  TCategoryReturn,
} from "../../interfaces/categorys.interfaces";
import { categorySchemaReturn } from "../../schemas/categorys.schema";
import { AppError } from "../../errror";

export const createCategory = async (data: TCategoryRequest) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const ensureCategoryNotExists = await categoryRepo.findOne({
    where: { name: data.name },
  });

  if (ensureCategoryNotExists) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoryRepo.create(data);

  await categoryRepo.save(category);

  const categoryReturn: TCategoryReturn = categorySchemaReturn.parse(category);

  return categoryReturn;
};
