import { Router } from "express";
import { validatedBodyMiddleware } from "../middlewares/validatedBody.middlewares";
import { createLoginControllers } from "../controllers/login.controllers";
import { loginSchema } from "../schemas/login.schemas";

export const loginRouter: Router = Router();

loginRouter.post(
  "",
  validatedBodyMiddleware(loginSchema),
  createLoginControllers
);
