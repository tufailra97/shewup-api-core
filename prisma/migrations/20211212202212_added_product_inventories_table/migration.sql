-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- CreateTable
CREATE TABLE "product_inventories" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT NOT NULL,
    "stores_id" TEXT NOT NULL,

    CONSTRAINT "product_inventories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_inventories" ADD CONSTRAINT "product_inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_inventories" ADD CONSTRAINT "product_inventories_stores_id_fkey" FOREIGN KEY ("stores_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
