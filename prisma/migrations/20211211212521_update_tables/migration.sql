/*
  Warnings:

  - The primary key for the `business_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `store_users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `business_users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `is_owner` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_line_1` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_code` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `store_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business_users" DROP CONSTRAINT "business_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "store_users" DROP CONSTRAINT "store_users_userId_fkey";

-- DropIndex
DROP INDEX "business_users_userId_key";

-- AlterTable
ALTER TABLE "business_users" DROP CONSTRAINT "business_users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "is_owner" BOOLEAN NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "business_users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "address_line_1" TEXT NOT NULL,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "post_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "store_users" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "gender" "gender" NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropEnum
DROP TYPE "user_roles";

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
