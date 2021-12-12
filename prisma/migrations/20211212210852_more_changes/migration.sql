/*
  Warnings:

  - You are about to drop the column `order_index` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `business` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `business_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `section_index` to the `menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_refunded` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customersId` to the `product_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customersId` to the `store_reviews` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `store_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "store_user_roles" AS ENUM ('MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "business_user_roles" AS ENUM ('ADMIN', 'REPORTER', 'SUPER_ADMIN');

-- DropForeignKey
ALTER TABLE "business_users" DROP CONSTRAINT "business_users_business_id_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_business_id_fkey";

-- DropForeignKey
ALTER TABLE "product_reviews" DROP CONSTRAINT "product_reviews_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_business_id_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_business_id_fkey";

-- AlterTable
ALTER TABLE "business_users" DROP COLUMN "role",
ADD COLUMN     "role" "business_user_roles" NOT NULL;

-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "order_index",
ADD COLUMN     "section_index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "is_refunded" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "product_reviews" ADD COLUMN     "customersId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sku";

-- AlterTable
ALTER TABLE "store_reviews" ADD COLUMN     "customersId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "store_users" DROP COLUMN "role",
ADD COLUMN     "role" "store_user_roles" NOT NULL;

-- DropTable
DROP TABLE "business";

-- DropEnum
DROP TYPE "BusinessUsersRole";

-- DropEnum
DROP TYPE "StoreUserRoles";

-- CreateTable
CREATE TABLE "product_price_history" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "city" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT E'United Kingdom',

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_price_history" ADD CONSTRAINT "product_price_history_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_reviews" ADD CONSTRAINT "store_reviews_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
