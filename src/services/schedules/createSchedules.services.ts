import { Repository } from "typeorm";
import { TSchedulesRequest } from "../../interfaces/schedules.interfaces";
import { Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";

export const createSchedulesServices = async (data: TSchedulesRequest) => {
  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const schedule: Schedule = schedulesRepo.create(data);

  await schedulesRepo.save(schedule);
};
