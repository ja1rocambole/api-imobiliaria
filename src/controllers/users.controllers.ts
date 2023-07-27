import { Request, Response } from "express";
import {
  TUserRequest,
  TUserReturn,
  TUserUpdateRequest,
} from "../interfaces/users.interfaces";
import { createUserServices } from "../services/users/createUser.services";
import { readeUsersServices } from "../services/users/readUsers.services";
import { updateUserServices } from "../services/users/updateUser.services";
import { deleteUserServices } from "../services/users/deleteUser.services";

export const createUserControllers = async (req: Request, res: Response) => {
  const userReq: TUserRequest = req.body;

  const userReturn: TUserReturn = await createUserServices(userReq);

  return res.status(201).json(userReturn);
};

export const readUserControllers = async (req: Request, res: Response) => {
  const allUsersReturn: TUserReturn[] = await readeUsersServices();

  return res.status(200).json(allUsersReturn);
};

export const updateUserControllers = async (req: Request, res: Response) => {
  const userReq: TUserUpdateRequest = req.body;
  const idParams = Number(req.params.id);

  const newUsereturn = await updateUserServices(idParams, userReq);

  return res.status(200).json(newUsereturn);
};

export const deleteUserControllers = async (req: Request, res: Response) => {
  const idParams = Number(req.params.id);

  await deleteUserServices(idParams);

  return res.status(204).send();
};
