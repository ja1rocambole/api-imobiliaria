import { Repository } from "typeorm";
import { Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

export const readRealEstateWithCategoryIdServices = async (
  idCategory: number
) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryId = idCategory;

  const findRealEstatesWithCategory = await realEstateRepo.find({
    where: { category: { id: categoryId } },
  });

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = (await categoryRepo.findOne({
    where: { id: categoryId },
  })) as Category;

  return {
    id: category.id,
    name: category.name,
    realEstate: findRealEstatesWithCategory,
  };
};
