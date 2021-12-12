/*
  Warnings:

  - Made the column `country` on table `business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "business" ALTER COLUMN "country" SET NOT NULL;
