import { Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errror";

export const ensureRealEstateExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const realEstateId = Number(req.params.id);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateValid = await realEstateRepo.findOne({
    where: { id: realEstateId },
  });

  if (!realEstateValid) {
    throw new AppError("RealEstate not found", 404);
  }

  next();
};
