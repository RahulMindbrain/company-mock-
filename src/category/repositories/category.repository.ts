import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";

export class CategoryRepository {
async createCategory(data: Prisma.CategoryCreateInput, adminId: number) {
  return prisma.category.create({
    data: {
      categoryname: data.categoryname,
      description: data.description,

      createdBy: adminId, 
      updatedBy: adminId
    }
  });
}


  async findAll() {
    return prisma.category.findMany();
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

async updateCategory(id: number, data: Prisma.CategoryUpdateInput, adminId: number) {
  return prisma.category.update({
    where: { id },
    data: {
      categoryname: data.categoryname,
      description: data.description,
      status: data.status,
      updatedBy: adminId
    }
  });
}

  async deleteCategory(id: number) {
    return prisma.category.delete({
      where: { id: id },
    });
  }

  async findByAdminId(id: number) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async findByCategoryName(categoryname:string){
    return prisma.category.findFirst({
      where:{categoryname},
    });
  }

}
