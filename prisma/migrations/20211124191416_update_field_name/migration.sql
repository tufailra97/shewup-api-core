/*
  Warnings:

  - You are about to drop the column `categoryId` on the `category_tags` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `category_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category_tags" DROP CONSTRAINT "category_tags_categoryId_fkey";

-- DropIndex
DROP INDEX "category_tags_category_id_idx";

-- AlterTable
ALTER TABLE "category_tags" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "category_tags_category_id_idx" ON "category_tags"("category_id");

-- AddForeignKey
ALTER TABLE "category_tags" ADD CONSTRAINT "category_tags_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
