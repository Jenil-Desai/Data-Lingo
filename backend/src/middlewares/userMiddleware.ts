import { Request, Response, NextFunction } from "express";

import { userLoginBody, userRegisterBody } from "../types/userTypes";
import { userLoginSchema, userRegisterSchema } from "../validations/userValidations";

export const validateUserRegistrationBody = (req: Request, res: Response, next: NextFunction) => {
  const body: userRegisterBody = req.body;
  const result = userRegisterSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};

export const validateUserLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const body: userLoginBody = req.body;
  const result = userLoginSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};
