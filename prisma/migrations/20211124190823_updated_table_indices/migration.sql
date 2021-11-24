-- DropIndex
DROP INDEX "product_reviews_product_id_user_id_rating_idx";

-- DropIndex
DROP INDEX "product_tags_product_id_tag_id_idx";

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE INDEX "category_tags_tag_id_idx" ON "category_tags"("tag_id");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "product_reviews_product_id_idx" ON "product_reviews"("product_id");

-- CreateIndex
CREATE INDEX "product_reviews_user_id_idx" ON "product_reviews"("user_id");

-- CreateIndex
CREATE INDEX "product_reviews_rating_idx" ON "product_reviews"("rating");

-- CreateIndex
CREATE INDEX "product_tags_product_id_idx" ON "product_tags"("product_id");

-- CreateIndex
CREATE INDEX "product_tags_tag_id_idx" ON "product_tags"("tag_id");

-- CreateIndex
CREATE INDEX "products_name_idx" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- RenameIndex
ALTER INDEX "category_tags_categoryId_idx" RENAME TO "category_tags_category_id_idx";

-- RenameIndex
ALTER INDEX "users_gender" RENAME TO "users_gender_idx";
