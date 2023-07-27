import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validatedBodyMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.parse(req.body);

    req.body = validated;

    next();
  };
