/*
  Warnings:

  - You are about to drop the `CategoryTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryTags" DROP CONSTRAINT "CategoryTags_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryTags" DROP CONSTRAINT "CategoryTags_tag_id_fkey";

-- DropTable
DROP TABLE "CategoryTags";

-- CreateTable
CREATE TABLE "category_tags" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "category_tags_categoryId_idx" ON "category_tags"("categoryId");

-- AddForeignKey
ALTER TABLE "category_tags" ADD CONSTRAINT "category_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_tags" ADD CONSTRAINT "category_tags_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
