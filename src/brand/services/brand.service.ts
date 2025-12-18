
import { AdminRepository } from "../../admin/repositories/admin.repository";
import { CompanyRepository } from "../../company/repositories/company.repository";
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateBrandDto } from "../dtos/brand.create.dto";
import { DeleteBrandDto } from "../dtos/brand.delete.dto";
import { UpdateBrandDto } from "../dtos/brand.update.dto";
import { BrandRepository } from "../repositories/brand.repository";


export class BrandService {
  private readonly repo: BrandRepository;
  private readonly comprepo:CompanyRepository ;
  

  constructor() {
    this.repo = new BrandRepository();
    this.comprepo = new CompanyRepository();
  }

  async create(data: CreateBrandDto,adminId:number) {
    //if category name is not there throw error 
    if(!data.brandname){

      throw new AppError(
        ERROR_CODES.BRAND_CREATION_FAILED,
        ERROR_MESSAGES.BRAND_CREATION_FAILED,
        HTTP_STATUS.BAD_REQUEST

      );

    }
    const name = await this.repo.findByBrandName(data.brandname);
    if(name){

       throw new AppError(
        ERROR_CODES.BRAND_ALREADY_EXISTS,
        ERROR_MESSAGES.BRAND_ALREADY_EXISTS,
        HTTP_STATUS.BAD_REQUEST
      );

    }

    const company = await this.comprepo.findById(data.companyId);
    if(!company){

       throw new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.BAD_REQUEST
      );

    }
return this.repo.createBrand(
  {
    brandname: data.brandname.trim(),
    companyId: data.companyId,
    status: data.status
  },
  adminId
);
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

  async update(id: number, data: UpdateBrandDto,adminId:number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.BRAND_UPDATE_FAILED,
        ERROR_MESSAGES.BRAND_UPDATE_FAILED,
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
        ERROR_CODES.BRAND_DELETE_FAILED,
        ERROR_MESSAGES.BRAND_DELETE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.deleteBrand(id);
  }
}
