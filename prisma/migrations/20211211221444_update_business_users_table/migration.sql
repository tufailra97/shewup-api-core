/*
  Warnings:

  - Added the required column `business_id` to the `business_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_users" ADD COLUMN     "business_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
