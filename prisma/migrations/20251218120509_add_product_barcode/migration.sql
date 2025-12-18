-- DropIndex
DROP INDEX "Product_barcodeId_key";

-- CreateTable
CREATE TABLE "ProductBarcode" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "productname" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "barcodeId" INTEGER NOT NULL,

    CONSTRAINT "ProductBarcode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductBarcode_companyId_brandId_idx" ON "ProductBarcode"("companyId", "brandId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBarcode_companyId_brandId_productname_size_key" ON "ProductBarcode"("companyId", "brandId", "productname", "size");
