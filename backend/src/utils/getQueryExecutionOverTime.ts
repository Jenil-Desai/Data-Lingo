import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getQueryExecutionOverTime(userId: number) {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  // Group the messages by month and count the number of SQL queries
  const queryExecutions = await prisma.message.groupBy({
    by: ["timestamp"], // Group by the timestamp (month will be extracted)
    where: {
      chat: {
        userId: userId, // Filter by userId
      },
      sqlQuery: {
        not: null, // Ensure only messages with SQL queries are counted
      },
      timestamp: {
        gte: startOfYear, // Start from the beginning of the year
      },
    },
    _count: {
      sqlQuery: true, // Count the number of SQL queries
    },
  });

  // Aggregate the data by month
  const monthlyData = Array(12).fill(0); // Initialize an array to hold counts for each month

  queryExecutions.forEach((execution) => {
    const month = new Date(execution.timestamp).getMonth(); // Get the month index (0 for January, 11 for December)
    monthlyData[month] += execution._count.sqlQuery; // Increment the count for that month
  });

  return monthlyData;
}
