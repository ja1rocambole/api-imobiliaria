import { Router } from "express";
import {
  createRealEstateControllers,
  readRealEstateControllers,
} from "../controllers/realEstate.controllers";
import { validatedBodyMiddleware } from "../middlewares/validatedBody.middlewares";
import { realEstateSchemaRequest } from "../schemas/realEstate.schemas";
import { validatedTokenMiddlewares } from "../middlewares/validatedToken.middlewares";
import { ensureUserIsAdminMiddlewares } from "../middlewares/ensureUserIsAdmin.middlewares";
import { ensureAddressUniqueMiddlewares } from "../middlewares/ensureAddressUnique.middlewares";

export const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  validatedBodyMiddleware(realEstateSchemaRequest),
  ensureAddressUniqueMiddlewares,
  validatedTokenMiddlewares,
  ensureUserIsAdminMiddlewares,
  createRealEstateControllers
);

realEstateRouter.get("", readRealEstateControllers);
