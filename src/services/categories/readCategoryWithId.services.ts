import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { categoryArraySchemaReturn } from "../../schemas/categorys.schema";

export const readCategoryWithIdServices = async () => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const allCategories: Category[] = await categoryRepo.find();

  const allCategoriesReturn = categoryArraySchemaReturn.parse(allCategories);

  return allCategoriesReturn;
};
