import { Request, Response, NextFunction } from "express";

import { databaseCheckBody, databaseEditBody, databaseNewBody } from "../types/databaseTypes";
import { DatabaseCheckSchema, databaseEditSchema, databaseNewSchema } from "../validations/databaseValidations";

export const ValidateDatabaseCheckBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseCheckBody = req.body;

  const result = DatabaseCheckSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};

export const ValidateDatabaseNewBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseNewBody = req.body;

  const result = databaseNewSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};

export const ValidateDatabaseEditBody = async (req: Request, res: Response, next: NextFunction) => {
  const body: databaseEditBody = req.body;

  const result = databaseEditSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ status: false, error: result.error.issues[0].message });
  }
  next();
};
