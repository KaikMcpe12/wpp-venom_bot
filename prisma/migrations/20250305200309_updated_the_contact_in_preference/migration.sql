/*
  Warnings:

  - You are about to drop the column `userId` on the `Preference` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactId" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Preference_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Preference" ("createdAt", "id", "preferences", "updatedAt") SELECT "createdAt", "id", "preferences", "updatedAt" FROM "Preference";
DROP TABLE "Preference";
ALTER TABLE "new_Preference" RENAME TO "Preference";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
