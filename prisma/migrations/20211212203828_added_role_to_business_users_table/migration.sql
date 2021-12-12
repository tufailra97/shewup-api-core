/*
  Warnings:

  - Added the required column `role` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_business_id_fkey";

-- AlterTable
ALTER TABLE "business_users" ADD COLUMN     "role" "BusinessUsersRole" NOT NULL;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
