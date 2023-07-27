import { Request, Response } from "express";
import {
  TRealEstateSchedulesReturn,
  TSchedulesRequest,
} from "../interfaces/schedules.interfaces";
import { ensureScheduleDateAndHourIsValidServices } from "../services/schedules/ensureScheduleDateAndHourIsValid.services";
import { ensureSchedulesAvailableServices } from "../services/schedules/ensureSchedulesAvailable.services";
import { ensureUserAvailableServices } from "../services/schedules/ensureUserAvailable.services";
import { createSchedulesServices } from "../services/schedules/createSchedules.services";
import { ensureRealEstateExistsServices } from "../services/schedules/ensureRealEstateExists.services";
import { readSchedulesRealEstateServices } from "../services/schedules/readSchedulesRealEstate.services";

export const createScheduleControllers = async (
  req: Request,
  res: Response
) => {
  const scheduleReq: TSchedulesRequest = req.body;
  const userId = Number(res.locals.id);
  await ensureRealEstateExistsServices(scheduleReq.realEstateId);

  ensureScheduleDateAndHourIsValidServices(scheduleReq.date, scheduleReq.hour);

  await ensureSchedulesAvailableServices(
    scheduleReq.date,
    scheduleReq.hour,
    scheduleReq.realEstateId
  );

  await ensureUserAvailableServices(scheduleReq.date, scheduleReq.hour, userId);

  await createSchedulesServices(scheduleReq);

  return res.status(201).json({ message: "Schedule created" });
};

export const readSchedulesRealEstateControllers = async (
  req: Request,
  res: Response
) => {
  const realEstateId = Number(req.params.id);

  const schedulesReturn: TRealEstateSchedulesReturn =
    await readSchedulesRealEstateServices(realEstateId);

  return res.status(200).json(schedulesReturn);
};
