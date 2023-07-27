import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { realEstateSchedulesSchemaReturn } from "../../schemas/schedules.schemas";
import { TRealEstateSchedulesReturn } from "../../interfaces/schedules.interfaces";

export const readSchedulesRealEstateServices = async (realEstateId: number) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const find = await realEstateRepo
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("realEstate.schedules", "schedule")
    .leftJoinAndSelect("schedule.user", "user")
    .where("realEstate.id = :realEstateId", { realEstateId })
    .getOne();

  const findReturn: TRealEstateSchedulesReturn =
    realEstateSchedulesSchemaReturn.parse(find);

  return findReturn;
};
