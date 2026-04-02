-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('sortie', 'realisation');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "type" "ArticleType" NOT NULL DEFAULT 'sortie';
