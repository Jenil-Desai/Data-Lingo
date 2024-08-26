const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function getUserIdByUsername(username: string): Promise<number> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user.id;
  } catch (err) {
    console.error("Error fetching user ID:", err);
    throw err;
  }
}
