import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const userRegister: RequestHandler = async (req: Request, res: Response) => {
  const { fname, lname, username, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    return res.status(400).json({ error: "Username Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      fname,
      lname,
      username,
      email,
      Password: hashedPassword,
    },
    select: {
      username: true,
    },
  });

  const token = jwt.sign(newUser.username, process.env.JWT_SECRET || "");

  res.status(200).json({ token });
};

export const userLogin: RequestHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      Password: true,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "User Not Found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.Password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(username, process.env.JWT_SECRET || "");
  res.status(200).json({ token });
};

export const userDestroy: RequestHandler = async (req: Request, res: Response) => {
  const username = res.locals.username;

  try {
    const result = await prisma.user.delete({
      where: {
        username,
      },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid Username" });
  }
};
