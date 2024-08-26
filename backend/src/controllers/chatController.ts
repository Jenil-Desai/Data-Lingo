import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

import { getUserIdByUsername } from "../utils/userUtils";
import { getConnectionIdByConnectionName } from "../utils/databaseUtils";

const prisma = new PrismaClient();

export const chatNew: RequestHandler = async (req: Request, res: Response) => {
  const { chatName, connectionName } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);
  const dbConnectionId = await getConnectionIdByConnectionName(connectionName, userId);

  const newChat = await prisma.chat.create({
    data: {
      chatName,
      userId,
      dbConnectionId,
    },
  });

  return res.status(200).json({ success: true, newChat });
};

export const chatEdit: RequestHandler = async (req: Request, res: Response) => {
  const { chatName, chatId } = req.body;
  try {
    const result = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        chatName,
      },
      select: {
        chatName: true,
      },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid Chat ID Else You aren't Owner" });
  }
};
