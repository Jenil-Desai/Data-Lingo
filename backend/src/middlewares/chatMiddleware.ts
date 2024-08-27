import { Request, Response, NextFunction } from "express";
import { chatDestroyBoy, chatEditBody, chatNewBody } from "../types/chat";
import { chatDestroySchema, chatEditSchema, chatNewSchema } from "../validations/chatValidations";

export const validateChatNewBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatNewBody = req.body;

  const result = chatNewSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};

export const validateChatEditBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatEditBody = req.body;

  const result = chatEditSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};

export const validateChatDestroyBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatDestroyBoy = req.body;

  const result = chatDestroySchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};
