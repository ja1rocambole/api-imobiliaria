import { TUserRequest, TUserReturn } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { userSchemaReturn } from "../../schemas/users.schemas";

export const createUserServices = async (
  data: TUserRequest
): Promise<TUserReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepo.create(data);

  await userRepo.save(user);

  const userReturn: TUserReturn = userSchemaReturn.parse(user);

  return userReturn;
};
