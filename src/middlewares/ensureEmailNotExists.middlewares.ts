import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { Repository } from "typeorm";
import { AppError } from "../errror";

export const ensureEmailNotExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const emailReq = req.body.email;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  if (emailReq) {
    const findUserEmail = await userRepo.findOne({
      where: { email: emailReq },
    });

    if (findUserEmail) {
      throw new AppError("Email already exists", 409);
    }
  }

  next();
};
