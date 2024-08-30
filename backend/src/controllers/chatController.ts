import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

import { getUserIdByUsername } from "../utils/userUtils";
import { getConnectionIdByConnectionName } from "../utils/databaseUtils";

const prisma = new PrismaClient();

export const chatNew: RequestHandler = async (req: Request, res: Response) => {
  const { chatName, connectionName, chatEmoji } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const chatCount = await prisma.chat.count({
    where: {
      userId,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (chatCount < user!.chatLimit) {
    const dbConnectionId = await getConnectionIdByConnectionName(connectionName, userId);

    const newChat = await prisma.chat.create({
      data: {
        chatEmoji,
        chatName,
        userId,
        dbConnectionId,
      },
    });

    return res.status(200).json({ success: true, newChat });
  } else {
    return res.status(400).json({ success: false, error: "Chat Limited Reached" });
  }
};

export const chatEdit: RequestHandler = async (req: Request, res: Response) => {
  const { chatName, chatId, chatEmoji } = req.body;
  try {
    const result = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        chatName,
        chatEmoji,
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

export const chatDestroy: RequestHandler = async (req: Request, res: Response) => {
  const chatId = Number(req.params.chatId);
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  try {
    const result = await prisma.chat.delete({
      where: {
        id: chatId,
        userId,
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

export const chatList: RequestHandler = async (req: Request, res: Response) => {
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const result = await prisma.chat.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      chatName: true,
      chatEmoji: true,
    },
  });
  return res.status(200).json({ status: true, result });
};

export const chatHistroy: RequestHandler = async (req: Request, res: Response) => {
  const { chatId } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const result = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
    select: {
      id: true,
      chatEmoji: true,
      chatName: true,
      dbConnection: true,
      messages: {
        select: {
          id: true,
          sender: true,
          messageText: true,
          sqlQuery: true,
          queryResult: true,
          timestamp: true,
        },
      },
    },
  });

  res.status(200).json(result);
};
