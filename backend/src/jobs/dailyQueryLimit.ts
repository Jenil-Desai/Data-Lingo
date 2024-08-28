import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function dailyQueryLimit() {
  try {
    await prisma.user.updateMany({
      data: { dailyQueryLimit: 0 },
    });

    console.log("Daily query limits have been reset for all users.");
  } catch (error) {
    console.error("Error resetting daily query limits:", error);
  } finally {
    await prisma.$disconnect();
  }
}
