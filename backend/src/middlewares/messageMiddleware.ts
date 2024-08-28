import { Request, Response, NextFunction } from "express";

import { messageNewBody } from "../types/message";
import { messageNewSchema } from "../validations/messageValidations";

export const validateMessageNewBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: messageNewBody = req.body;
  const result = messageNewSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};
