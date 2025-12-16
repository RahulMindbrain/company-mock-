
import { RecordStatus } from "@prisma/client";
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateProductDto } from "../dtos/product.create.dto";
import { UpdateProductDto } from "../dtos/product.update.dto";
import { ProductRepository } from "../repositories/product.repository";


export class ProductService {
  private readonly repo: ProductRepository;

  constructor() {
    this.repo = new ProductRepository();
  }

async create(data: CreateProductDto, adminId: number) {

if (!data.productname || !data.productname.trim()) {
throw new AppError(
ERROR_CODES.PRODUCT_NAME_REQUIRED,
ERROR_MESSAGES.PRODUCT_NAME_REQUIRED,
HTTP_STATUS.BAD_REQUEST
);
}


const admin = await this.repo.findByAdminId(adminId);
if (!admin) {
throw new AppError(
ERROR_CODES.ADMIN_NOT_FOUND,
ERROR_MESSAGES.ADMIN_NOT_FOUND,
HTTP_STATUS.UNAUTHORIZED
);
}


const existingProduct = await this.repo.findByProductName(
data.productname.trim()
);

if (existingProduct) {
throw new AppError(
ERROR_CODES.PRODUCT_ALREADY_EXISTS,
ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS,
HTTP_STATUS.CONFLICT
);
}


if (data.categoryId) {
const category = await this.repo.findCategoryById(data.categoryId);
if (!category) {
throw new AppError(
ERROR_CODES.CATEGORY_NOT_FOUND,
"Category not found",
HTTP_STATUS.BAD_REQUEST
);
}
}


if (data.brandId) {
const brand = await this.repo.findBrandById(data.brandId);
if (!brand) {
throw new AppError(
ERROR_CODES.BRAND_NOT_FOUND,
"Brand not found",
HTTP_STATUS.BAD_REQUEST
);
}
}




const parsedData: CreateProductDto = {
...data,
productname: data.productname.trim(),
otherImgs: data.otherImgs ?? [], 
status: data.status ?? RecordStatus.ACTIVE,
};


return this.repo.createProduct(parsedData, adminId);
}

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        ERROR_CODES.BRAND_NOT_FOUND,
        ERROR_MESSAGES.BRAND_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return brand;
  }

async update(
id: number,
data: UpdateProductDto,
adminId: number
) {

const existing = await this.repo.findById(id);
if (!existing) {
throw new AppError(
ERROR_CODES.PRODUCT_NOT_FOUND,
ERROR_MESSAGES.PRODUCT_NOT_FOUND,
HTTP_STATUS.NOT_FOUND
);
}


const admin = await this.repo.findByAdminId(adminId);
if (!admin) {
throw new AppError(
ERROR_CODES.ADMIN_NOT_FOUND,
"Admin not found",
HTTP_STATUS.UNAUTHORIZED
);
}


if (
data.productname &&
data.productname.trim() !== existing.productname
) {
const duplicate = await this.repo.findByProductName(
data.productname.trim()
);

if (duplicate && duplicate.id !== id) {
throw new AppError(
ERROR_CODES.PRODUCT_ALREADY_EXISTS,
ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS,
HTTP_STATUS.CONFLICT
);
}
}


if (data.categoryId !== undefined) {
if (data.categoryId === null) {
// allow unlink
} else {
const category = await this.repo.findCategoryById(data.categoryId);
if (!category) {
throw new AppError(
ERROR_CODES.CATEGORY_NOT_FOUND,
"Category not found",
HTTP_STATUS.BAD_REQUEST
);
}
}
}


if (data.brandId !== undefined) {
if (data.brandId === null) {
// allow unlink
} else {
const brand = await this.repo.findBrandById(data.brandId);
if (!brand) {
throw new AppError(
ERROR_CODES.BRAND_NOT_FOUND,
"Brand not found",
HTTP_STATUS.BAD_REQUEST
);
}
}
}




const parsedData = {
...data,
productname: data.productname?.trim(),
otherImgs: data.otherImgs ?? undefined,
};

return this.repo.updateProduct(id, parsedData, adminId);
}

  async delete(id: number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.BRAND_DELETE_FAILED,
        ERROR_MESSAGES.BRAND_DELETE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.deleteProduct(id);
  }
}
