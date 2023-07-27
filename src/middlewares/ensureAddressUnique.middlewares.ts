import { NextFunction, Request, Response } from "express";
import { Address } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errror";
import { TAddressReq } from "../interfaces/address.interfaces";

export const ensureAddressUniqueMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressReq: TAddressReq = req.body.address;

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const addressExists = await addressRepo.findOne({
    where: {
      street: addressReq.street,
      zipCode: addressReq.zipCode,
      city: addressReq.city,
      state: addressReq.state,
      number: addressReq.number ? addressReq.number : "",
    },
  });

  if (addressExists) {
    throw new AppError("Address already exists", 409);
  }

  next();
};
