import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// List of all possible database types in the required order
const allDatabaseTypes = ["mysql", "postgres", "oracle"];

export default async function getDatabaseUsage(userId: number) {
  try {
    // Fetch actual usage data from the database
    const data = await prisma.databaseConnection.groupBy({
      by: ["connectionType"], // Ensure this matches the field in your schema
      where: {
        userId,
      },
      _count: {
        id: true, // Assuming you count connections by their IDs
      },
    });

    // Create a map to store counts by type
    const usageMap: Record<string, number> = {};

    // Populate the map with actual data
    data.forEach((usage) => {
      const type = usage.connectionType as string;
      const count = usage._count.id ?? 0;
      usageMap[type] = count;
    });

    // Create an array of counts in the specific order
    const result = allDatabaseTypes.map((type) => usageMap[type] ?? 0);

    return result;
  } catch (error) {
    console.error("Error fetching database usage:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
