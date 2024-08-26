import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access Forbidden" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    res.locals.username = data;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
