-- CreateEnum
CREATE TYPE "plans" AS ENUM ('Starter', 'Essential', 'Professional', 'Enterprise');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chatLimit" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "connectionLimit" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currentPlan" "plans" NOT NULL DEFAULT 'Starter',
ADD COLUMN     "planEndDate" TIMESTAMP(3);
