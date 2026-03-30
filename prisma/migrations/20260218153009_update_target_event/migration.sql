/*
  Warnings:

  - The `target` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TargetAudience" AS ENUM ('all', 'subscribers', 'visitors');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "target",
ADD COLUMN     "target" "TargetAudience" NOT NULL DEFAULT 'all';
