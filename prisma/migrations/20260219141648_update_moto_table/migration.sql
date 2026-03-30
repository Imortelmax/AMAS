/*
  Warnings:

  - Added the required column `model` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moto" ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
