/*
  Warnings:

  - Added the required column `order_index` to the `menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN     "order_index" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "store_reviews" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" "rating" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "store_reviews_store_id_idx" ON "store_reviews"("store_id");

-- CreateIndex
CREATE INDEX "store_reviews_rating_idx" ON "store_reviews"("rating");

-- AddForeignKey
ALTER TABLE "store_reviews" ADD CONSTRAINT "store_reviews_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
