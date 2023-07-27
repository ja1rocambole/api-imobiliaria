import { NextFunction, Request, Response } from "express";
import { AppError } from "../errror";

export const ensureUserHasPermissionForUpdateMiddlewares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminToken: boolean = res.locals.admin;
  const idToken: number = Number(res.locals.id);
  const idParams = Number(req.params.id);

  if (!adminToken) {
    if (idToken !== idParams) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  next();
};
