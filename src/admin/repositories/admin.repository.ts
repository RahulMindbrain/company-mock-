import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";

export class AdminRepository {
  async create(data: Prisma.AdminCreateInput) {
    return prisma.admin.create({ data });
  } 

  async findAll() {
    return prisma.admin.findMany();
  }

  async findById(id: number) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.AdminUpdateInput) {
    return prisma.admin.update({
      where: { id: id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.admin.delete({
      where: { id: id },
    });
  }

  async findByEmail(email?: string) {
    if (!email) return null;
    return prisma.admin.findFirst({
      where: {
        email,
      },
    });
  }

  async findCompanyById(id: number) {
  return prisma.company.findUnique({
    where: { id },
  });
}

}
