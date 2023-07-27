import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaReturn,
  userUpdateSchemaRequest,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

export type TUser = z.infer<typeof userSchema>;

export type TUserRequest = z.infer<typeof userSchemaRequest>;

export type TUserReturn = z.infer<typeof userSchemaReturn>;

export type TUserUpdateRequest = DeepPartial<typeof userUpdateSchemaRequest>;
