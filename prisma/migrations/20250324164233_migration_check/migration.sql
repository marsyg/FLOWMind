/*
  Warnings:

  - You are about to drop the column `priority` on the `FixedTask` table. All the data in the column will be lost.
  - You are about to drop the column `timeWindow` on the `FixedTask` table. All the data in the column will be lost.
  - Made the column `userId` on table `FixedTask` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repeat` on table `FixedTask` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FixedTask" DROP CONSTRAINT "FixedTask_userId_fkey";

-- AlterTable
ALTER TABLE "FixedTask" DROP COLUMN "priority",
DROP COLUMN "timeWindow",
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "repeat" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FixedTask" ADD CONSTRAINT "FixedTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
