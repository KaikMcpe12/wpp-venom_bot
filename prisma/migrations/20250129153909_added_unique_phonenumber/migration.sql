/*
  Warnings:

  - A unique constraint covering the columns `[phonenumber]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_phonenumber_key" ON "Contact"("phonenumber");
