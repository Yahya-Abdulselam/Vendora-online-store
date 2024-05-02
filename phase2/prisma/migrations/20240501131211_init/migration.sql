/*
  Warnings:

  - A unique constraint covering the columns `[name,sellerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_sellerId_key" ON "Product"("name", "sellerId");
