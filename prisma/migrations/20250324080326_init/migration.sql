/*
  Warnings:

  - Added the required column `priority` to the `FixedTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeWindow` to the `FixedTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FixedTask" DROP CONSTRAINT "FixedTask_userId_fkey";

-- AlterTable
ALTER TABLE "FixedTask" ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "timeWindow" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "repeat" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FixedTask" ADD CONSTRAINT "FixedTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
