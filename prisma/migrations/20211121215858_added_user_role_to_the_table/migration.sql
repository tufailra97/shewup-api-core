/*
  Warnings:

  - Added the required column `user_role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('ADMIN', 'MANAGER', 'STAFF', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_role" "user_roles" NOT NULL;

-- DropEnum
DROP TYPE "Roles";
