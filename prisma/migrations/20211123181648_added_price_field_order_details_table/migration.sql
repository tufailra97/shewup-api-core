/*
  Warnings:

  - Added the required column `price` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE INDEX "order_details_product_id_idx" ON "order_details"("product_id");
