/*
  Warnings:

  - You are about to drop the column `user_id` on the `product_reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_user_id_fkey";

-- DropIndex
DROP INDEX "product_reviews_user_id_idx";

-- AlterTable
ALTER TABLE "product_images" ADD COLUMN     "business_branch_id" TEXT,
ADD COLUMN     "business_id" TEXT,
ADD COLUMN     "index" INTEGER DEFAULT 0,
ADD COLUMN     "name" TEXT DEFAULT E'',
ALTER COLUMN "description" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "businessBranchId" TEXT,
ADD COLUMN     "businessId" TEXT;

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_name_key" ON "business"("name");

-- CreateIndex
CREATE INDEX "business_name_idx" ON "business"("name");

-- CreateIndex
CREATE UNIQUE INDEX "business_branch_name_key" ON "business_branch"("name");

-- CreateIndex
CREATE INDEX "business_branch_name_idx" ON "business_branch"("name");

-- CreateIndex
CREATE INDEX "business_branch_city_idx" ON "business_branch"("city");

-- CreateIndex
CREATE INDEX "business_branch_country_idx" ON "business_branch"("country");

-- CreateIndex
CREATE INDEX "business_branch_post_code_idx" ON "business_branch"("post_code");

-- CreateIndex
CREATE INDEX "business_branch_business_id_idx" ON "business_branch"("business_id");

-- CreateIndex
CREATE INDEX "business_branch_address_idx" ON "business_branch"("address_line_1", "address_line_2");

-- CreateIndex
CREATE INDEX "product_images_business_id_idx" ON "product_images"("business_id");

-- CreateIndex
CREATE INDEX "product_images_business_branch_id_idx" ON "product_images"("business_branch_id");

-- CreateIndex
CREATE INDEX "products_price_idx" ON "products"("price");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_businessBranchId_fkey" FOREIGN KEY ("businessBranchId") REFERENCES "business_branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_business_branch_id_fkey" FOREIGN KEY ("business_branch_id") REFERENCES "business_branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_branch" ADD CONSTRAINT "business_branch_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
