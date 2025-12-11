-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('0', '1');

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryname" TEXT,
    "description" JSONB,
    "status" "CategoryStatus" NOT NULL DEFAULT '1',
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
