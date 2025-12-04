import { prisma } from "../../../db/prisma";
import { Prisma} from "@prisma/client";
import { CreateCompanyDto } from "../dtos/company.create.dto";
import { UpdateCompanyDto } from "../dtos/company.update.dto";



export class CompanyRepository {
  
  async create(data:Prisma.CompanyCreateInput) {
    return prisma.company.create({ data });
  }

  async findAll() {
    return prisma.company.findMany();
  }

  async findById(id: number) {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  async update(id:number,data: Prisma.CompanyUpdateInput) {
    return prisma.company.update({
      where: { id:id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.company.delete({
      where: { id:id },
    });
  }
}
