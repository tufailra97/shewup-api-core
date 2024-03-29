/*
  Warnings:

  - Added the required column `contact_number` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contact_number" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL;
