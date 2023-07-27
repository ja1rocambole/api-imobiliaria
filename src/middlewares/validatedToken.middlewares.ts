import { NextFunction, Request, Response } from "express";
import { AppError } from "../errror";
import { verify } from "jsonwebtoken";

export const validatedTokenMiddlewares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authorization.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.admin = decoded.admin;
    res.locals.id = decoded.sub;
  });

  next();
};
