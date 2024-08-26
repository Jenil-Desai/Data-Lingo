import { Request, Response, NextFunction } from "express";
import { chatEditBody, chatNewBody } from "../types/chat";
import { chatEditSchema, chatNewSchema } from "../validations/chatValidations";

export const validateChatNewBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatNewBody = req.body;

  const result = chatNewSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};

export const validateChatEditBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatEditBody = req.body;

  const result = chatEditSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};
