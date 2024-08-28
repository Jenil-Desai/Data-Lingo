import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserIdByUsername } from "../utils/userUtils";
import getQueryExecutionOverTime from "../utils/getQueryExecutionOverTime";
import getDatabaseUsage from "../utils/getDatabaseUsage";

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

export const userStats: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const queryUsedTillNow = await prisma.message.count({
    where: {
      chat: {
        userId,
      },
      sqlQuery: {
        not: null,
      },
    },
  });
  const totalQueryExcludingCurrentMonth = await prisma.message.count({
    where: {
      chat: {
        userId,
      },
      sqlQuery: {
        not: null,
      },
      timestamp: {
        not: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    },
  });
  const totalQueryPercentageChange = ((queryUsedTillNow - totalQueryExcludingCurrentMonth) / (queryUsedTillNow + totalQueryExcludingCurrentMonth)) * 2;

  const connectionUsed = await prisma.databaseConnection.count({
    where: {
      userId,
    },
  });
  const connectionLimit = user!.connectionLimit;

  const totalChats = await prisma.chat.count({
    where: {
      userId,
    },
  });
  const chatLimit = user!.chatLimit;

  const dailyQuery = user!.dailyQueryLimit;
  const queryLimit = user!.queryLimit;

  const currentPlan = JSON.stringify(user!.currentPlan);
  const expiryDay = user!.planEndDate ? JSON.stringify(user!.planEndDate) : new Date().toLocaleDateString();
  const currentDate = new Date();
  const remDays = user!.planEndDate ? Math.round(currentDate.getTime() - user!.planEndDate!.getTime() / (1000 * 3600 * 24)) : 0;
  const queryExecutionOverTime = await getQueryExecutionOverTime(user!.id);
  const databaseUsage = await getDatabaseUsage(user!.id);

  res.status(200).json({ queryUsedTillNow, totalQueryPercentageChange, connectionUsed, connectionLimit, totalChats, chatLimit, dailyQuery, queryLimit, currentPlan, expiryDay, remDays, queryExecutionOverTime, databaseUsage });
};
