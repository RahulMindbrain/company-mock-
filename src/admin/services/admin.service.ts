import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateAdminDto } from "../dtos/admin.create.dto";
import { DeleteAdminDto } from "../dtos/admin.delete.dto";
import { UpdateAdminDto } from "../dtos/admin.update.dto";
import { AdminRepository } from "../repositories/admin.repository";




export class AdminService {
  private readonly repo: AdminRepository;

  constructor() {
    this.repo = new AdminRepository();
  }

  async create(data: CreateAdminDto) {
     
    if (!data.firstname || !data.lastname) {
  throw new AppError(
    ERROR_CODES.DATA_INSUFFICIENT,
    ERROR_MESSAGES.DATA_INSUFFICIENT,
    HTTP_STATUS.UNPROCESSABLE_ENTITY
  );
}
  const existing = await this.repo.findByEmail(data.email);
  if (existing){
    throw new AppError(
      ERROR_CODES.EMAIL_ALREADY_EXISTS,
      ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      HTTP_STATUS.CONFLICT
    )
  }

  
      if (!data.companyId) {
  throw new AppError(
    ERROR_CODES.DATA_INSUFFICIENT,
    ERROR_MESSAGES.DATA_INSUFFICIENT,
    HTTP_STATUS.UNPROCESSABLE_ENTITY
  );
}

  const company = await this.repo.findCompanyById(data.companyId)

  if(!company){

     throw new AppError(
    ERROR_CODES.COMPANY_NOT_FOUND,
    ERROR_MESSAGES.COMPANY_NOT_FOUND,
    HTTP_STATUS.NOT_FOUND
  );

  }

  const parsedData = {
    ...data,
     };

    return this.repo.create(parsedData);
  }


  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const admin = await this.repo.findById(id);
    if (!admin) {
      throw new AppError(
        ERROR_CODES.ADMIN_NOT_FOUND,
        ERROR_MESSAGES.ADMIN_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return admin;
  }

  async update(id: number, data: UpdateAdminDto) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.ADMIN_NOT_FOUND,
        ERROR_MESSAGES.ADMIN_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
      const parsedData = {
    ...data,
    };

    return this.repo.update(id, parsedData);
  }

  async delete(id: number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.ADMIN_NOT_FOUND,
        ERROR_MESSAGES.ADMIN_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.delete(id);
  }
}
