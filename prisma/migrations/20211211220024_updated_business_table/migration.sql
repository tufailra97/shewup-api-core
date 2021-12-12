/*
  Warnings:

  - Added the required column `address_line_1` to the `business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_code` to the `business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business" ADD COLUMN     "address_line_1" TEXT NOT NULL,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "post_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "company_number" TEXT;
