import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { Repository } from "typeorm";
import { AppError } from "../errror";

export const ensureIdExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userExists = await userRepo.findOne({
    where: { id: id },
  });

  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  next();
};
