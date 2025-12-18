
import { RecordStatus } from "@prisma/client";
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateProductDto } from "../dtos/product.create.dto";
import { UpdateProductDto } from "../dtos/product.update.dto";
import { ProductRepository } from "../repositories/product.repository";
import { BrandRepository } from "../../brand/repositories/brand.repository";
import { CategoryRepository } from "../../category/repositories/category.repository";
import { AutonumRepository } from "../../autonum/repositories/autonum.repository";
import { CompanyRepository } from "../../company/repositories/company.repository";
import log from "../../utils/logger";


export class ProductService {
  private readonly repo: ProductRepository;
  private readonly brandrepo: BrandRepository;
  private readonly categoryrepo: CategoryRepository;
  private readonly autonumrepo: AutonumRepository;
  private readonly companyrepo: CompanyRepository;


  constructor() {
    this.repo = new ProductRepository();
    this.brandrepo = new BrandRepository();
    this.categoryrepo = new CategoryRepository();
    this.autonumrepo = new AutonumRepository();
    this.companyrepo = new CompanyRepository();

  }

async create(data: CreateProductDto, adminId: number) {

    log.info({
  companyId: data.companyId,
  brandId: data.brandId,
  sizeValue: data.sizeValue,
  sizeUnit: data.sizeUnit
});
  
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
const brand = await this.brandrepo.findById(data.brandId);
log.info(brand);
if (!brand) {
    throw new AppError(
      ERROR_CODES.BRAND_NOT_FOUND,
      ERROR_MESSAGES.BRAND_NOT_FOUND,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!data.sizeValue || !data.sizeUnit) {
    throw new AppError(
      ERROR_CODES.SIZE_REQUIRED,
      ERROR_MESSAGES.SIZE_REQUIRED,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const company = await this.companyrepo.findById(data.companyId)
 log.info(company)
  if (!company) {
  throw new AppError(
    ERROR_CODES.COMPANY_NOT_FOUND,
    ERROR_MESSAGES.COMPANY_NOT_FOUND,
    HTTP_STATUS.BAD_REQUEST
  );
}

  
  const normalizedProductName = data.productname.trim().toLowerCase();
  const sizeKey = `${data.sizeValue}_${data.sizeUnit}`;

  
  const existingBarcode = await this.repo.findExistingProductBarcode({
    companyId: data.companyId,
    brandId: data.brandId,
    productname: normalizedProductName,
    size: sizeKey
  });
  log.info(existingBarcode)

  let barcodeId: number;

if (existingBarcode) {

  barcodeId = existingBarcode.barcodeId;
} else {
 
  barcodeId = await this.autonumrepo.incrementBarcode(data.companyId);


  await this.repo.feedProductBarcode(
    data.companyId,
    data.brandId,
    normalizedProductName,
    sizeKey,
    barcodeId
  );
}

  
  const parsedData = {
    ...data,
    productname: normalizedProductName,
    barcodeId,
    otherImgs: data.otherImgs ?? [],
    status: data.status ?? RecordStatus.ACTIVE
  };

  log.info(parsedData)

  return this.repo.createProduct(parsedData, adminId);
}



  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new AppError(
        ERROR_CODES.PRODUCT_NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return product;
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
        ERROR_CODES.PRODUCT_DELETE_FAILED,
        ERROR_MESSAGES.PRODUCT_DELETE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.deleteProduct(id);
  }
}
