import { Request, Response, RequestHandler, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { fetchMySQLTablesAndColumns, fetchOracleTablesAndColumns, fetchPostgresTablesAndColumns, testMySQLConnection, testOracleConnection, testPostgresConnection } from "../utils/databaseUtils";
import { getUserIdByUsername } from "../utils/userUtils";

const prisma = new PrismaClient();

export const databaseCheck: RequestHandler = async (req: Request, res: Response) => {
  const { connectionType, connectionString } = req.body;
  let result;
  switch (connectionType.toLowerCase()) {
    case "mysql":
      result = await testMySQLConnection(connectionString);
      break;

    case "postgres":
      result = await testPostgresConnection(connectionString);
      break;

    case "oracle":
      result = await testOracleConnection(connectionString);
      break;

    default:
      return res.status(400).json({ success: false, message: "Unsupported database type" });
  }
  return res.json(result);
};

export const databaseNew: RequestHandler = async (req: Request, res: Response) => {
  const { connectionName, connectionType, connectionString } = req.body;

  let result;
  switch (connectionType.toLowerCase()) {
    case "mysql":
      result = await testMySQLConnection(connectionString);
      break;

    case "postgres":
      result = await testPostgresConnection(connectionString);
      break;

    case "oracle":
      result = await testOracleConnection(connectionString);
      break;

    default:
      return res.status(400).json({ success: false, message: "Unsupported database type" });
  }

  if (result.success) {
    const username = res.locals.username;
    const userId = await getUserIdByUsername(username);
    let tables;

    switch (connectionType.toLowerCase()) {
      case "postgres":
        tables = await fetchPostgresTablesAndColumns(connectionString);
        break;
      case "mysql":
        tables = await fetchMySQLTablesAndColumns(connectionString);
        break;
      case "oracle":
        tables = await fetchOracleTablesAndColumns(connectionString);
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedConnectionString = await bcrypt.hash(connectionString, salt);

    const newConnection = await prisma.databaseConnection.create({
      data: {
        userId,
        connectionName,
        connectionString,
        connectionType,
        tables: {
          create: tables.map((table: any) => ({
            tableName: table.name,
            columns: {
              create: table.columns.map((column: any) => ({
                columnName: column.name,
                dataType: column.dataType,
              })),
            },
          })),
        },
      },
      select: {
        connectionName: true,
        connectionType: true,
      },
    });

    return res.status(200).json({ success: true, newConnection });
  } else {
    return res.json(result);
  }
};

export const databaseDestroy: RequestHandler = async (req: Request, res: Response) => {
  const { databaseConnectionId } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  try {
    const result = await prisma.databaseConnection.delete({
      where: {
        id: databaseConnectionId,
        userId,
      },
      select: {
        connectionName: true,
        connectionType: true,
      },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid Database Connection ID Else You aren't Owner" });
  }
};

export const databaseEdit: RequestHandler = async (req: Request, res: Response) => {
  const { connectionName, connectionId } = req.body;
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  try {
    const result = await prisma.databaseConnection.update({
      where: {
        id: connectionId,
        userId,
      },
      data: {
        connectionName,
      },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid Database Connection ID Else You aren't Owner" });
  }
};

export const databaseList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.username;
  const userId = await getUserIdByUsername(username);

  const result = await prisma.databaseConnection.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      connectionName: true,
    },
  });
  return res.status(200).json({ status: true, result });
};
