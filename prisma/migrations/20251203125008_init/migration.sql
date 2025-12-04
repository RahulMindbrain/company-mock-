-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT,
    "websiteUrl" TEXT,
    "printName" TEXT,
    "billPrefix" TEXT,
    "beginningDate" TIMESTAMP(3),
    "commencingFrom" TIMESTAMP(3),
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "country" TEXT,
    "state" TEXT,
    "contactNo1" TEXT,
    "contactNo2" TEXT,
    "email" TEXT,
    "website" TEXT,
    "gstNo" TEXT,
    "panNo" TEXT,
    "vatNo" TEXT,
    "fax" TEXT,
    "lightLogo" TEXT,
    "darkLogo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
