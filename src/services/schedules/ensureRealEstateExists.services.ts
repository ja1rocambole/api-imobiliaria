import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errror";

export const ensureRealEstateExistsServices = async (realEstateId: number) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateValid = await realEstateRepo.findOne({
    where: { id: realEstateId },
  });

  if (!realEstateValid) {
    throw new AppError("RealEstate not found", 404);
  }
};
