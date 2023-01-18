/*
  Warnings:

  - Made the column `resumeId` on table `ProfileDescription` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfileDescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "ProfileDescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProfileDescription_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfileDescription" ("id", "resumeId", "text", "userId") SELECT "id", "resumeId", "text", "userId" FROM "ProfileDescription";
DROP TABLE "ProfileDescription";
ALTER TABLE "new_ProfileDescription" RENAME TO "ProfileDescription";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
