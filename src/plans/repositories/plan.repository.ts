import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";

export class PlanRepository {
  async create(data: Prisma.PlanCreateInput) {
    return prisma.plan.create({ data });
  }

  async findAll() {
    return prisma.plan.findMany();
  }

  async findById(id: number) {
    return prisma.plan.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.PlanUpdateInput) {
    return prisma.plan.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.plan.delete({
      where: { id: id },
    });
  }

  async findByName(name: string) {
    return prisma.plan.findFirst({
      where: {
        name,
      },
    });
  }

  async findByNameForCompany(name: string, companyId: number) {
   
  return prisma.plan.findFirst({
    where: {
      name,
      companyId
    }
  });
}

  async findCompanyById(id: number) {
  return prisma.company.findUnique({
    where: { id },
  });
}

}
