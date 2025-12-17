/*
  Warnings:

  - You are about to drop the column `sre` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barcodeId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId,productname,brandId,sizeValue,sizeUnit]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcodeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SizeUnit" AS ENUM ('ML', 'LTR', 'G', 'KG', 'PCS');

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sre",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "barcodeId" INTEGER NOT NULL,
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "sizeUnit" "SizeUnit",
ADD COLUMN     "sizeValue" DOUBLE PRECISION,
ADD COLUMN     "spe" TEXT;

-- CreateTable
CREATE TABLE "AutoNumber" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "barcodeId" INTEGER NOT NULL,

    CONSTRAINT "AutoNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "status" "RecordStatus" NOT NULL DEFAULT '1',
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AutoNumber_companyId_idx" ON "AutoNumber"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "AutoNumber_companyId_key" ON "AutoNumber"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcodeId_key" ON "Product"("barcodeId");

-- CreateIndex
CREATE INDEX "Product_companyId_idx" ON "Product"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_companyId_productname_brandId_sizeValue_sizeUnit_key" ON "Product"("companyId", "productname", "brandId", "sizeValue", "sizeUnit");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
