import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TUserReturn } from "../../interfaces/users.interfaces";
import { userArraySchemaReturn } from "../../schemas/users.schemas";

export const readeUsersServices = async (): Promise<TUserReturn[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const allUsers: User[] = await userRepo.find({ withDeleted: true });

  const allUsersReturn: TUserReturn[] = userArraySchemaReturn.parse(allUsers);

  return allUsersReturn;
};
