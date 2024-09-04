import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { getUserIdByUsername } from "../utils/userUtils";
import { executeQuery } from "../utils/databaseUtils";
import cleanSQLQuery from "../utils/cleanSQLQuery";
import { promptGenrate } from "../utils/messageUtils";

const prisma = new PrismaClient();

export const messageNew: RequestHandler = async (req: Request, res: Response) => {
  const { chatId, messageText } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user!.dailyQueryLimit < user!.queryLimit) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { dbConnection: true },
    });

    if (!chat || chat.userId !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await prisma.message.create({
      data: {
        chatId: chat.id,
        sender: "user",
        messageText,
      },
    });

    const dbConnection = await prisma.databaseConnection.findFirst({
      where: {
        id: chat.dbConnectionId,
      },
      include: {
        tables: {
          include: {
            columns: true,
          },
        },
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      select: {
        sender: true,
        messageText: true,
        sqlQuery: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    const formattedMessages = messages.map((message) => ({
      role: message.sender === "user" ? "user" : "model",
      parts: [{ text: message.messageText ? message.messageText : message.sqlQuery }],
    }));

    console.log(formattedMessages);

    const prompt = promptGenrate(dbConnection as any);
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const aiChat = model.startChat({
        history: formattedMessages as any,
      });
      const result = await aiChat.sendMessage([messageText, prompt]);
      const query = result.response.text();
      const cleanQuery = cleanSQLQuery(query);
      const data = await executeQuery(dbConnection?.connectionType as string, dbConnection?.connectionString as string, cleanQuery);
      console.log(data);
      // const result = await model.generateContent([messageText, prompt]);
      // const query = result.response.text();
      // const cleanQuery = cleanSQLQuery(query);
      // const data = await executeQuery(dbConnection?.connectionType as string, dbConnection?.connectionString as string, cleanQuery);
      // console.log(data);
      const systemMessage = await prisma.message.create({
        data: {
          chatId: chat.id,
          sender: "model",
          sqlQuery: cleanQuery,
          queryResult: JSON.stringify(data),
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          dailyQueryLimit: { increment: 1 },
        },
      });

      return res.status(200).json(JSON.parse(systemMessage.queryResult as string));
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json({ error: "Daily Query Limit Reached" });
  }
};

export const messageDestroy: RequestHandler = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    const msg = await prisma.message.delete({
      where: {
        id: parseInt(messageId),
      },
    });
    res.status(200).json(msg);
  } catch (error) {
    res.status(400).json({ error });
  }
};
