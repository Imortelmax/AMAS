-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('president', 'vice_president', 'tresorier', 'technique', 'secretaire', 'communication');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "role" "MemberRole"[],
    "phone" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
