import { Router } from "express";
import {
  createUserControllers,
  deleteUserControllers,
  readUserControllers,
  updateUserControllers,
} from "../controllers/users.controllers";
import { validatedBodyMiddleware } from "../middlewares/validatedBody.middlewares";
import {
  userSchemaRequest,
  userUpdateSchemaRequest,
} from "../schemas/users.schemas";
import { ensureEmailNotExistsMiddlewares } from "../middlewares/ensureEmailNotExists.middlewares";
import { validatedTokenMiddlewares } from "../middlewares/validatedToken.middlewares";
import { ensureUserIsAdminMiddlewares } from "../middlewares/ensureUserIsAdmin.middlewares";
import { ensureUserHasPermissionForUpdateMiddlewares } from "../middlewares/ensureUserHasPermissionForUpdate.middlewares";
import { ensureIdExistsMiddlewares } from "../middlewares/ensureIdExists.middlewares";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validatedBodyMiddleware(userSchemaRequest),
  ensureEmailNotExistsMiddlewares,
  createUserControllers
);

userRouter.get(
  "",
  validatedTokenMiddlewares,
  ensureUserIsAdminMiddlewares,
  readUserControllers
);

userRouter.patch(
  "/:id",
  validatedBodyMiddleware(userUpdateSchemaRequest),
  ensureIdExistsMiddlewares,
  validatedTokenMiddlewares,
  ensureUserHasPermissionForUpdateMiddlewares,
  ensureEmailNotExistsMiddlewares,
  updateUserControllers
);
userRouter.delete(
  "/:id",
  ensureIdExistsMiddlewares,
  validatedTokenMiddlewares,
  ensureUserIsAdminMiddlewares,
  deleteUserControllers
);
