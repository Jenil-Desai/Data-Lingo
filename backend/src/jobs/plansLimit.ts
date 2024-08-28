import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function plansLimit() {
  try {
    const users = await prisma.user.findMany({
      where: {
        planEndDate: { lt: new Date() },
      },
    });

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          connectionLimit: 1,
          chatLimit: 5,
          queryLimit: 10,
          planEndDate: null,
        },
      });
    }

    console.log("Expired plans handled and limits adjusted.");
  } catch (error) {
    console.error("Error handling expired plans:", error);
  } finally {
    await prisma.$disconnect();
  }
}
