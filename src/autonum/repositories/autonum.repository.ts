import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";
import { CreateAutonumDto } from "../dtos/autonum.create.dto";
import { UpdateAutonumDto } from "../dtos/autonum.update.dto";


export class AutonumRepository {

  async create(data: CreateAutonumDto) {
    return prisma.autoNumber.create({
      data: {
        companyId: data.companyId,
        barcodeId: data.barcodeId,
      },
    });
  }


  async findByCompanyId(companyId: number) {
    return prisma.autoNumber.findUnique({
      where: { companyId },
    });
  }


  async incrementBarcode(companyId: number): Promise<number> {
    const counter = await prisma.autoNumber.update({
      where: { companyId },
      data: {
        barcodeId: { increment: 1 },
      },
    });

    return counter.barcodeId;
  }


  async resetBarcode(companyId: number, startFrom: number) {
    return prisma.autoNumber.update({
      where: { companyId },
      data: {
        barcodeId: startFrom,
      },
    });
  }

}
