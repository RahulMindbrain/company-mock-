import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateCompanyDto } from "../dtos/company.create.dto";
import { UpdateCompanyDto } from "../dtos/company.update.dto";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {
  private readonly repo: CompanyRepository;

  constructor() {
    this.repo = new CompanyRepository();
  }

  async create(data: CreateCompanyDto) {
          if (data.email) {
    const exists = await this.repo.findByEmail(data.email);
    
    if (exists) {
      throw new AppError(
        ERROR_CODES.COMPANY_ALREADY_EXISTS,
        ERROR_MESSAGES.COMPANY_MAIL_EXIST,
        HTTP_STATUS.CONFLICT
      );
    }
  }
  const parsedData = {
    ...data,
    beginningDate: data.beginningDate ? new Date(data.beginningDate) : undefined,
    commencingFrom: data.commencingFrom ? new Date(data.commencingFrom) : undefined,
  };

    return this.repo.create(parsedData);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const company = await this.repo.findById(id);
    if (!company) {
      throw new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CITY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
      const parsedData = {
    ...data,
    beginningDate: data.beginningDate ? new Date(data.beginningDate) : undefined,
    commencingFrom: data.commencingFrom ? new Date(data.commencingFrom) : undefined,
  };

    return this.repo.update(id, parsedData);
  }

  async delete(id: number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CITY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.delete(id);
  }
}
