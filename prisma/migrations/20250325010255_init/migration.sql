/*
  Warnings:

  - You are about to drop the column `prirority` on the `FixedTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FixedTask" DROP COLUMN "prirority",
ADD COLUMN     "priority" TEXT;
