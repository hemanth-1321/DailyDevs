/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserMetrics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserMetrics_userId_key" ON "UserMetrics"("userId");
