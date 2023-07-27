import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { realEstateWithOutCategorySchemaArrayReturn } from "../../schemas/realEstate.schemas";
import { TRealEstateWithOutcategoryReturn } from "../../interfaces/realEstate.interfaces";

export const readRealEstateServices = async () => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const manyRealEstates = await realEstateRepo.find({
    relations: { address: true },
  });

  const manyRealEstatesReturn: TRealEstateWithOutcategoryReturn[] =
    realEstateWithOutCategorySchemaArrayReturn.parse(manyRealEstates);

  return manyRealEstatesReturn;
};
