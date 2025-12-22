import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";
import { CreateProductDto } from "../dtos/product.create.dto";
import { UpdateProductDto } from "../dtos/product.update.dto";


export type CreateProductRepoInput = CreateProductDto & {
  barcodeId: number;
  barcode?: string;
};

export class ProductRepository {
async createProduct(
  data: CreateProductRepoInput,
  adminId: number,
) {
  return prisma.product.create({
    data: {
      productname: data.productname,

      
     company: { connect: { id: data.companyId } },

      category: data.categoryId
        ? { connect: { id: data.categoryId } }
        : undefined,

      brand: data.brandId
        ? { connect: { id: data.brandId } }
        : undefined,

      barcodeId: data.barcodeId,
      barcode: data.barcode, // optional if you generate image  later

      sizeValue: data.sizeValue,
      sizeUnit: data.sizeUnit,

      sku: data.sku,
      hsncode: data.hsncode,
      dp: data.dp,
      mrp: data.mrp,
      taxPercent: data.taxPercent,
      stock: data.stock,
      description: data.description,
      spe: data.spe,
      BV: data.BV,
      mainImg: data.mainImg,
      otherImgs: data.otherImgs,
      status: data.status,

      createdBy: { connect: { id: adminId } },
      updatedBy: { connect: { id: adminId } },
    },
  });
}

async createManyProducts(
  data: CreateProductRepoInput[],
  adminId: number,
) {
  return prisma.product.createMany({
    data: data.map((item) => ({
      productname: item.productname,

      companyId: item.companyId,
      categoryId: item.categoryId ?? null,
      brandId: item.brandId ?? null,

      barcodeId: item.barcodeId,
      barcode: item.barcode,

      sizeValue: item.sizeValue,
      sizeUnit: item.sizeUnit,

      sku: item.sku,
      hsncode: item.hsncode,
      dp: item.dp,
      mrp: item.mrp,
      taxPercent: item.taxPercent,
      stock: item.stock,
      description: item.description,
      spe: item.spe,
      BV: item.BV,
      mainImg: item.mainImg,
      otherImgs: item.otherImgs,
      status: item.status,

      createdById: adminId,
      updatedById: adminId,
    })),
    skipDuplicates: true, 
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
  
  //this should be called when the company has the same brand , same category same product name but with different size [ml,l,pcs ... etc] and then increment the last barcodeid with 1
    async fetchLastAutonum(companyId:number){
      return prisma.autoNumber.findUnique({
        where: {companyId},
      });
    }

    //mapping of product and barcode [ProductBarcode]
async feedProductBarcode(companyId: number,brandId: number,productname: string,size: string,barcodeId: number
) {
  return prisma.productBarcode.create({
    data: {
      companyId,
      brandId,
      productname,
      size,
      barcodeId
    }
  });
}

async findExistingProductBarcode(params: {
  companyId: number;
  brandId: number;
  productname: string;
  size: string;
}) {
  const { companyId, brandId, productname, size } = params;

  return prisma.productBarcode.findUnique({
    where: {
      companyId_brandId_productname_size: {
        companyId,
        brandId,
        productname,
        size
      }
    }
  });
}

}
