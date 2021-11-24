/*
  Warnings:

  - Changed the type of `rating` on the `product_reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "rating" AS ENUM ('EXCELLENT', 'GOOD', 'AVERAGE', 'POOR', 'BAD', 'NA');

-- AlterTable
ALTER TABLE "product_reviews" DROP COLUMN "rating",
ADD COLUMN     "rating" "rating" NOT NULL;

-- DropEnum
DROP TYPE "Rating";

-- CreateIndex
CREATE INDEX "product_reviews_rating_idx" ON "product_reviews"("rating");
