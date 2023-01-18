/*
  Warnings:

  - A unique constraint covering the columns `[resumeId]` on the table `ProfileDescription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfileDescription_resumeId_key" ON "ProfileDescription"("resumeId");
