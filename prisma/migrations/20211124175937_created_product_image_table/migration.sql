/*
  Warnings:

  - Changed the type of `rating` on the `product_reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('EXCELLENT', 'GOOD', 'AVERAGE', 'POOR', 'BAD', 'NA');

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "rating",
ADD COLUMN     "rating" "Rating" NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "product_details" JSONB;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "contact_number" DROP NOT NULL;

-- CreateTable
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_images_product_id_idx" ON "product_images"("product_id");

-- CreateIndex
CREATE INDEX "product_reviews_product_id_user_id_rating_idx" ON "product_reviews"("product_id", "user_id", "rating");

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
