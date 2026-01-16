/*
  Warnings:

  - Added the required column `AdminCharge` to the `AutoNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PurchaseInvoice` to the `AutoNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PurchaseInvoiceCode` to the `AutoNumber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TDS` to the `AutoNumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AutoNumber" ADD COLUMN     "AdminCharge" INTEGER NOT NULL,
ADD COLUMN     "PurchaseInvoice" INTEGER NOT NULL,
ADD COLUMN     "PurchaseInvoiceCode" INTEGER NOT NULL,
ADD COLUMN     "TDS" INTEGER NOT NULL;
