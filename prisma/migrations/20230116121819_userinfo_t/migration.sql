-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "position" TEXT NOT NULL
);
INSERT INTO "new_UserInfo" ("address", "email", "firstName", "id", "lastName", "phone", "position") SELECT "address", "email", "firstName", "id", "lastName", "phone", "position" FROM "UserInfo";
DROP TABLE "UserInfo";
ALTER TABLE "new_UserInfo" RENAME TO "UserInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
