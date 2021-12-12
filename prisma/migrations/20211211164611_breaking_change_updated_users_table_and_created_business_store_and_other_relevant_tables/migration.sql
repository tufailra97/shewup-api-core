/*
  Warnings:

  - You are about to drop the column `created_at` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `business_branch_id` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `business_id` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `business_branch_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `business_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `businessBranchId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `contact_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_roles` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `business_branch` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoreUserRoles" AS ENUM ('MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "BusinessUsersRole" AS ENUM ('ADMIN', 'REPORTER', 'SUPER_ADMIN');

-- DropForeignKey
ALTER TABLE "business_branch" DROP CONSTRAINT "business_branch_business_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_business_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_business_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_business_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_business_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_businessBranchId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_businessId_fkey";

-- DropIndex
DROP INDEX "business_name_idx";

-- DropIndex
DROP INDEX "business_name_key";

-- DropIndex
DROP INDEX "product_images_business_branch_id_idx";

-- DropIndex
DROP INDEX "product_images_business_id_idx";

-- DropIndex
DROP INDEX "products_business_branch_id_idx";

-- DropIndex
DROP INDEX "products_business_id_idx";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_gender_idx";

-- DropIndex
DROP INDEX "users_last_name_first_name_idx";

-- AlterTable
ALTER TABLE "business" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "business_branch_id",
DROP COLUMN "business_id";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "business_branch_id",
DROP COLUMN "business_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "businessBranchId",
DROP COLUMN "businessId",
DROP COLUMN "contact_number",
DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "first_name",
DROP COLUMN "gender",
DROP COLUMN "last_name",
DROP COLUMN "password",
DROP COLUMN "updated_at",
DROP COLUMN "user_roles",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "business_branch";

-- CreateTable
CREATE TABLE "store_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "role" "StoreUserRoles" NOT NULL,
    "store_unique_pass_key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_validated" BOOLEAN NOT NULL,

    CONSTRAINT "store_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_users" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "business_users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_users_userId_key" ON "business_users"("userId");

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
