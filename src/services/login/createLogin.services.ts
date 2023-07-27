import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import { AppError } from "../../errror";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createLoginServices = async (
  data: TLoginRequest
): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepo.findOne({
    where: { email: data.email },
  });

  if (!findUser) {
    throw new AppError("Invalid credentials", 401);
  }

  const matchPassword: boolean = await compare(
    data.password,
    findUser.password
  );

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  if (findUser.deletedAt) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { admin: findUser.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: process.env.EXPIRES, subject: String(findUser.id) }
  );

  return token;
};
