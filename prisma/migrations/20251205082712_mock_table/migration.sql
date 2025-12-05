/*
  Warnings:

  - Made the column `walletbalance` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalwalletadd` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalwithdraw` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totaltransferwallet` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "walletbalance" SET NOT NULL,
ALTER COLUMN "walletbalance" SET DEFAULT 0,
ALTER COLUMN "totalwalletadd" SET NOT NULL,
ALTER COLUMN "totalwalletadd" SET DEFAULT 0,
ALTER COLUMN "totalwithdraw" SET NOT NULL,
ALTER COLUMN "totalwithdraw" SET DEFAULT 0,
ALTER COLUMN "totaltransferwallet" SET NOT NULL,
ALTER COLUMN "totaltransferwallet" SET DEFAULT 0;
