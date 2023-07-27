import {
  TUserRequest,
  TUserReturn,
  TUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { userSchemaReturn } from "../../schemas/users.schemas";

export const updateUserServices = async (
  id: number,
  data: TUserUpdateRequest
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const oldUser = await userRepo.findOneBy({
    id,
  });

  const user: User = await userRepo.save({ ...oldUser, ...data });

  const userReturn: TUserReturn = userSchemaReturn.parse(user);

  return userReturn;
};
