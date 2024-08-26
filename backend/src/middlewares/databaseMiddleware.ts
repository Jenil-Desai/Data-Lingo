import { Request, Response, NextFunction } from "express";

import { databaseCheckBody, databaseDestroyBody, databaseNewBody } from "../types/databaseTypes";
import { DatabaseCheckSchema, databaseDestroySchema, databaseNewSchema } from "../validations/databaseValidations";

export const ValidateDatabaseCheckBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseCheckBody = req.body;

  const result = DatabaseCheckSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};

export const ValidateDatabaseNewBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseNewBody = req.body;

  const result = databaseNewSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};

export const ValidateDatabaseDestroyBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseDestroyBody = req.body;

  const result = databaseDestroySchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  next();
};
