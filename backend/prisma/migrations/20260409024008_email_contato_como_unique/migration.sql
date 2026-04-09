/*
  Warnings:

  - A unique constraint covering the columns `[email_contato]` on the table `cadastro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cadastro_email_contato_key" ON "cadastro"("email_contato");
