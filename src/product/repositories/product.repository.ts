import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";
import { CreateProductDto } from "../dtos/product.create.dto";
import { UpdateProductDto } from "../dtos/product.update.dto";


export class ProductRepository {
async createProduct(
  data: CreateProductDto,
  adminId: number,
) {
  return prisma.product.create({
    data: {
      productname: data.productname,

      category: data.categoryId
        ? { connect: { id: data.categoryId } }
        : undefined,

      brand: data.brandId
        ? { connect: { id: data.brandId } }
        : undefined,

      sku: data.sku,
      hsncode: data.hsncode,
      dp: data.dp,
      mrp: data.mrp,
      taxPercent: data.taxPercent,
      stock: data.stock,
      description: data.description,
      sre: data.sre,
      BV: data.BV,
      mainImg: data.mainImg,
      otherImgs: data.otherImgs,
      status: data.status,

      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
    },
  });
}



  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

async updateProduct(id: number,data: Prisma.ProductUpdateInput,adminId: number){
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      updatedBy: {
        connect: { id: adminId },
      },
    },
  });
}

  async deleteProduct(id: number) {
    return prisma.brand.delete({
      where: { id: id },
    });
  }

  async findByAdminId(id: number) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async findByProductName(brandname:string){
    return prisma.brand.findFirst({
      where:{brandname},
    });
  }

  async findBrandById(brandId:number){
    return prisma.brand.findUnique({
      where:{id:brandId},
    })
  }

  async findCategoryById(categoryId:number){
    return prisma.category.findUnique({
      where:{id:categoryId},
    })
  }

}
