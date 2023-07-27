import { userSchema } from "./users.schemas";

export const loginSchema = userSchema.omit({
  id: true,
  name: true,
  admin: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});
