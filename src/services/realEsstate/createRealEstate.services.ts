import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import {
  TRealEstateRequest,
  TRealEstateReturn,
} from "../../interfaces/realEstate.interfaces";
import { AppError } from "../../errror";
import { realEstateSchemaReturn } from "../../schemas/realEstate.schemas";

export const createRealEstateServices = async (data: TRealEstateRequest) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const address: Address = addressRepo.create(data.address);
  await addressRepo.save(address);

  const category: Category | null = await categoryRepo.findOne({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstateData = {
    value: data.value,
    size: data.size,
    address: address,
    category: category,
  };

  const realEstate = realEstateRepo.create(realEstateData);
  await realEstateRepo.save(realEstate);

  const realEstateReturn: TRealEstateReturn =
    realEstateSchemaReturn.parse(realEstate);

  return realEstateReturn;
};
