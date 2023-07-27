import { Router } from "express";
import {
  createCategoryControllers,
  readCategoryControllers,
  readRealEstatesWithCategoryIdControllers,
} from "../controllers/categorys.controllers";
import { validatedBodyMiddleware } from "../middlewares/validatedBody.middlewares";
import { categorySchemaRequest } from "../schemas/categorys.schema";
import { validatedTokenMiddlewares } from "../middlewares/validatedToken.middlewares";
import { ensureUserIsAdminMiddlewares } from "../middlewares/ensureUserIsAdmin.middlewares";
import { ensureCategoryIdIxistsMiddlewares } from "../middlewares/ensureCategoryIdExists.middlewares";

export const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  validatedBodyMiddleware(categorySchemaRequest),
  validatedTokenMiddlewares,
  ensureUserIsAdminMiddlewares,
  createCategoryControllers
);

categoryRouter.get("", readCategoryControllers);

categoryRouter.get(
  "/:id/realEstate",
  ensureCategoryIdIxistsMiddlewares,
  readRealEstatesWithCategoryIdControllers
);
