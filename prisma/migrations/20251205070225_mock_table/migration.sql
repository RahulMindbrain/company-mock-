-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "name" TEXT,
    "price" DOUBLE PRECISION,
    "BV" DOUBLE PRECISION,
    "description" JSONB,
    "isActive" BOOLEAN,
    "tax" TEXT,
    "config" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "mobno1" TEXT,
    "mobno2" TEXT,
    "profileimg" TEXT,
    "admintype" TEXT,
    "walletbalance" DOUBLE PRECISION,
    "totalwalletadd" DOUBLE PRECISION,
    "totalwithdraw" DOUBLE PRECISION,
    "totaltransferwallet" DOUBLE PRECISION,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_companyId_idx" ON "Admin"("companyId");

-- CreateIndex
CREATE INDEX "Admin_status_idx" ON "Admin"("status");

-- CreateIndex
CREATE INDEX "Admin_admintype_idx" ON "Admin"("admintype");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
