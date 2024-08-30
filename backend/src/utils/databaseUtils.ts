import mysql from "mysql2/promise";
import { Client } from "pg";
import oracledb from "oracledb";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { queryMySQLProps, queryOracleProps, queryPostgresProps } from "../types/databaseTypes";

async function queryMySQL({ connectionString, query }: queryMySQLProps) {
  try {
    const connection = await mysql.createConnection(connectionString);
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function queryPostgres({ connectionString, query }: queryPostgresProps) {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res.rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function queryOracle({ connectionString, query }: queryOracleProps) {
  let connection;
  try {
    connection = await oracledb.getConnection({ connectionString });
    const result = await connection.execute(query);
    return result.rows;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

export async function executeQuery(dbType: string, connectionString: string, query: string) {
  switch (dbType) {
    case "mysql":
      return await queryMySQL({ connectionString, query });
    case "postgres":
      return await queryPostgres({ connectionString, query });
    case "oracle":
      return await queryOracle({ connectionString, query });
    default:
      throw new Error("Unsupported database type");
  }
}

export async function testMySQLConnection(connectionString: string) {
  try {
    const connection = await mysql.createConnection(connectionString);
    await connection.end();
    return { success: true, message: "MySQL connection successful" };
  } catch (err: any) {
    return { success: false, message: `MySQL connection failed: ${err.message}` };
  }
}

export async function testPostgresConnection(connectionString: string) {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    await client.end();
    return { success: true, message: "PostgreSQL connection successful" };
  } catch (err: any) {
    return { success: false, message: `PostgreSQL connection failed: ${err.message}` };
  }
}

export async function testOracleConnection(connectionString: string) {
  let connection;
  const [userCredentials, hostInfo] = connectionString.split("@");
  const [user, password] = userCredentials.split("/");
  const newConnectString = hostInfo;
  try {
    connection = await oracledb.getConnection({ user, password, connectionString: newConnectString });
    await connection.close();
    return { success: true, message: "Oracle connection successful" };
  } catch (err: any) {
    return { success: false, message: `Oracle connection failed: ${err.message}` };
  }
}

export async function fetchPostgresTablesAndColumns(connectionString: string) {
  const { Client } = require("pg");
  const client = new Client({ connectionString });

  await client.connect();

  const tablesQuery = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `;

  const columnsQuery = `
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public';
  `;

  const tables = await client.query(tablesQuery);
  const columns = await client.query(columnsQuery);

  await client.end();

  const tablesAndColumns = tables.rows.map((table: any) => {
    return {
      name: table.table_name,
      columns: columns.rows
        .filter((column: any) => column.table_name === table.table_name)
        .map((column: any) => ({
          name: column.column_name,
          dataType: column.data_type,
        })),
    };
  });

  return tablesAndColumns;
}

export async function fetchMySQLTablesAndColumns(connectionString: string) {
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(connectionString);

  const [tables] = await connection.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
    AND table_schema NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys');
  `);

  const [columns] = await connection.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = DATABASE()
    AND table_schema NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys');
  `);

  await connection.end();

  const tablesAndColumns = tables.map((table: any) => {
    return {
      name: table.TABLE_NAME,
      columns: columns
        .filter((column: any) => column.TABLE_NAME === table.TABLE_NAME)
        .map((column: any) => ({
          name: column.COLUMN_NAME,
          dataType: column.DATA_TYPE,
        })),
    };
  });

  return tablesAndColumns;
}

export async function fetchOracleTablesAndColumns(connectionString: string) {
  const oracledb = require("oracledb");

  const [userCredentials, hostInfo] = connectionString.split("@");
  const [user, password] = userCredentials.split("/");
  const connectString = hostInfo;

  const connection = await oracledb.getConnection({
    user,
    password,
    connectString,
  });

  const tables = await connection.execute(
    `
    SELECT table_name 
    FROM all_tables 
    WHERE owner = :owner
    AND owner NOT IN ('SYS', 'SYSTEM', 'ORDDATA', 'XDB', 'ORDPLUGINS', 'CTXSYS', 'MDSYS', 'OLAPSYS', 'WMSYS')
    AND table_name NOT LIKE 'BIN$%'
  `,
    [user.toUpperCase()]
  );

  const columns = await connection.execute(
    `
    SELECT table_name, column_name, data_type 
    FROM all_tab_columns 
    WHERE owner = :owner
  `,
    [user.toUpperCase()]
  );

  await connection.close();

  const tablesAndColumns = tables.rows.map((table: any) => {
    return {
      name: table[0],
      columns: columns.rows
        .filter((column: any) => column[0] === table[0])
        .map((column: any) => ({
          name: column[1],
          dataType: column[2],
        })),
    };
  });

  return tablesAndColumns;
}

export const getConnectionIdByConnectionName = async (connectionName: string, userId: number) => {
  try {
    const connection = await prisma.databaseConnection.findFirst({
      where: { connectionName, userId },
    });
    return connection.id;
  } catch (err) {
    console.error("Error fetching user ID:", err);
    throw err;
  }
};
