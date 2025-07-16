/*
  Warnings:

  - You are about to drop the column `github` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "github",
ADD COLUMN     "repository" TEXT,
ADD COLUMN     "repositoryUrl" TEXT;
