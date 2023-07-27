import { Request, Response } from "express";
import { createLoginServices } from "../services/login/createLogin.services";
import { TLoginRequest } from "../interfaces/login.interfaces";

export const createLoginControllers = async (req: Request, res: Response) => {
  const loginReq: TLoginRequest = req.body;

  const token = await createLoginServices(loginReq);

  return res.status(200).json({ token });
};
