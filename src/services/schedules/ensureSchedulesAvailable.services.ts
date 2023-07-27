import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities";
import { AppError } from "../../errror";

export const ensureSchedulesAvailableServices = async (
  date: string,
  hour: string,
  realEstateId: number
) => {
  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const schedulesAvailable: boolean =
    (await schedulesRepo
      .createQueryBuilder("schedules")
      .select("schedules")
      .where(
        "schedules.date = :date AND schedules.hour = :hour AND schedules.realEstateId = :realEstateId",
        {
          date: date,
          hour: hour,
          realEstateId: realEstateId,
        }
      )
      .getCount()) > 0;

  if (schedulesAvailable) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }
};
