
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

  async create(data: CreateProductDto,adminId:number) {
    //if category name is not there throw error 
    if(!data.productname){

      throw new AppError(
        ERROR_CODES.PRODUCT_NOT_FOUND,
        ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        HTTP_STATUS.BAD_REQUEST

      );

    }
    const product = await this.repo.findByProductName(data.productname);
    if(product){

       throw new AppError(
        ERROR_CODES.PRODUCT_ALREADY_EXISTS,
        ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );

    }

 
    const parsedData = {
      ...data,
    };

    return this.repo.createProduct(parsedData,adminId);
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

  async update(id: number, data: UpdateProductDto,adminId:number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.PRODUCT_UPDATE_FAILED,
        ERROR_MESSAGES.PRODUCT_UPDATE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }
    const parsedData = {
      ...data,
    };

    return this.repo.updateProduct(id, parsedData,adminId);
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
