-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "botstatus" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    CONSTRAINT "preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "User_phonenumber_idx" ON "User"("phonenumber");
