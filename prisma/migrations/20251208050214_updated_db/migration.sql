-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "address" TEXT,
ADD COLUMN     "countrycode" TEXT,
ADD COLUMN     "countryname" TEXT,
ADD COLUMN     "pinno" TEXT,
ADD COLUMN     "statename" TEXT;

-- AlterTable
ALTER TABLE "AdminSession" ADD COLUMN     "ipAddress" TEXT;
