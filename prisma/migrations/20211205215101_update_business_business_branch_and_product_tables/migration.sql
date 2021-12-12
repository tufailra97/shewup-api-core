/*
  Warnings:

  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `business_branch_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_a_side_product` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orders_user_id_idx";

-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "business_branch_id" TEXT NOT NULL,
ADD COLUMN     "business_id" TEXT,
ADD COLUMN     "is_a_side_product" BOOLEAN NOT NULL;

-- CreateIndex
CREATE INDEX "products_business_id_idx" ON "products"("business_id");

-- CreateIndex
CREATE INDEX "products_is_a_side_product_idx" ON "products"("is_a_side_product");

-- CreateIndex
CREATE INDEX "products_business_branch_id_idx" ON "products"("business_branch_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_business_branch_id_fkey" FOREIGN KEY ("business_branch_id") REFERENCES "business_branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
