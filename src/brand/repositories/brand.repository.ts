import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";

export class BrandRepository {
async createBrand(
  data: {
    brandname: string;
    companyId: number;
    status?: "ACTIVE" | "INACTIVE";
  },
  adminId: number
) {
  return prisma.brand.create({
    data: {
      brandname: data.brandname,
      status: data.status ?? "ACTIVE",

      // REQUIRED relation
      company: {
        connect: { id: data.companyId }
      },

      // audit relations
      createdBy: {
        connect: { id: adminId }
      },
      updatedBy: {
        connect: { id: adminId }
      }
    }
  });
}

  async findAll() {
    return prisma.brand.findMany();
  }

  async findById(id: number) {
    return prisma.brand.findUnique({
      where: { id },
    });
  }

async updateBrand(id: number, data: Prisma.BrandUpdateInput, adminId: number) {
  return prisma.brand.update({
    where: { id },
    data: {
      brandname: data.brandname,
      status: data.status,
      updatedById: adminId
    }
  });
}

  async deleteBrand(id: number) {
    return prisma.brand.delete({
      where: { id: id },
    });
  }

  async findByAdminId(id: number) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async findByBrandName(brandname:string){
    return prisma.brand.findFirst({
      where:{brandname},
    });
  }

}
