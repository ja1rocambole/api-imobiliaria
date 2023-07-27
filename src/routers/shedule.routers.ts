import { Router } from "express";
import {
  createScheduleControllers,
  readSchedulesRealEstateControllers,
} from "../controllers/schedule.controllers";
import { validatedTokenMiddlewares } from "../middlewares/validatedToken.middlewares";
import { validatedBodyMiddleware } from "../middlewares/validatedBody.middlewares";
import { schedulesSchema } from "../schemas/schedules.schemas";
import { ensureUserIsAdminMiddlewares } from "../middlewares/ensureUserIsAdmin.middlewares";
import { ensureRealEstateExistsMiddlewares } from "../middlewares/ensureRealEstateExists.middlewares";

export const scheduleRouter: Router = Router();

scheduleRouter.post(
  "",
  validatedTokenMiddlewares,
  validatedBodyMiddleware(schedulesSchema),
  createScheduleControllers
);
scheduleRouter.get(
  "/realEstate/:id",
  validatedTokenMiddlewares,
  ensureUserIsAdminMiddlewares,
  ensureRealEstateExistsMiddlewares,
  readSchedulesRealEstateControllers
);
