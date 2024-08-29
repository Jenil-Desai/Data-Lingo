import { Request, Response, NextFunction } from "express";
import { chatEditBody, chatHistroyBody, chatNewBody } from "../types/chat";
import { chatEditSchema, chatHistroySchema, chatNewSchema } from "../validations/chatValidations";

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

export const validateChatHistroyBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: chatHistroyBody = req.body;

  const result = chatHistroySchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};
