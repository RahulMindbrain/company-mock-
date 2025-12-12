
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateBrandDto } from "../dtos/brand.create.dto";
import { DeleteBrandDto } from "../dtos/brand.delete.dto";
import { UpdateBrandDto } from "../dtos/brand.update.dto";
import { BrandRepository } from "../repositories/brand.repository";

export class BrandService {
  private readonly repo: BrandRepository;

  constructor() {
    this.repo = new BrandRepository();
  }

  async create(data: CreateBrandDto,adminId:number) {
    //if category name is not there throw error 
    if(!data.brandname){

      throw new AppError(
        ERROR_CODES.CATEGORY_CREATION_FAILED,
        ERROR_MESSAGES.CATEGORY_CREATION_FAILED,
        HTTP_STATUS.BAD_REQUEST
      );

    }
    const name = await this.repo.findByBrandName(data.brandname);
    if(name){

       throw new AppError(
        ERROR_CODES.CATEGORY_ALREADY_EXISTS,
        ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS,
        HTTP_STATUS.BAD_REQUEST
      );

    }
    //to find if there exist a category with the given id or not

    const parsedData = {
      ...data,
    };

    return this.repo.createBrand(parsedData,adminId);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        ERROR_CODES.CATEGORY_NOT_FOUND,
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return brand;
  }

  async update(id: number, data: UpdateBrandDto,adminId:number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CATEGORY_NOT_FOUND,
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    const parsedData = {
      ...data,
    };

    return this.repo.updateBrand(id, parsedData,adminId);
  }

  async delete(id: number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CATEGORY_DELETE_FAILED,
        ERROR_MESSAGES.CATEGORY_DELETE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.deleteBrand(id);
  }
}
