/*
  Warnings:

  - The `status` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('0', '1');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "status",
ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "status",
ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT '1';

-- DropEnum
DROP TYPE "CategoryStatus";

-- CreateIndex
CREATE INDEX "Admin_status_idx" ON "Admin"("status");
