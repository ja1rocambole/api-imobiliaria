import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities";
import { AppError } from "../../errror";

export const ensureUserAvailableServices = async (
  date: string,
  hour: string,
  userId: number
) => {
  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const userAvailable: boolean =
    (await schedulesRepo
      .createQueryBuilder("schedules")
      .select("schedules")
      .where(
        "schedules.date = :date AND schedules.hour = :hour AND schedules.userId = :userId",
        {
          date: date,
          hour: hour,
          userId: userId,
        }
      )
      .getCount()) > 0;

  if (userAvailable) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
};
