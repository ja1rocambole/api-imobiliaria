import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { Repository } from "typeorm";
import { AppError } from "../errror";

export const ensureCategoryIdIxistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryId = Number(req.params.id);

  const category: Category | null = await categoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  next();
};
