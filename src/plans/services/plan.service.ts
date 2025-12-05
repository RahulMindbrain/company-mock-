import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreatePlanDto } from "../dtos/plan.create.dto";
import { DeletePlanDto } from "../dtos/plan.delete.dto";
import { UpdatePlanDto } from "../dtos/plan.update.dto";
import { PlanRepository } from "../repositories/plan.repository";

export class PlanService {
  private readonly repo: PlanRepository;

  constructor() {
    this.repo = new PlanRepository();
  }

  async create(data: CreatePlanDto) {
    //if the plan name is not there
    if (!data.name) {
      throw new AppError(
        ERROR_CODES.INVALID_PLAN_DATA,
        ERROR_MESSAGES.INVALID_PLAN_DATA,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (!data.companyId) {
      throw new AppError(
        ERROR_CODES.INVALID_PLAN_DATA,
        ERROR_MESSAGES.INVALID_PLAN_DATA,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const company = await this.repo.findCompanyById(data.companyId);

    if (!company) {
      throw new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    const existing = await this.repo.findByNameForCompany(
      data.name,
      data.companyId
    );
    if (existing) {
      throw new AppError(
        ERROR_CODES.PLAN_ALREADY_EXISTS,
        ERROR_MESSAGES.PLAN_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }
    //to find if there exist a company with the given id or not

    const parsedData = {
      ...data,
    };

    return this.repo.create(parsedData);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const plan = await this.repo.findById(id);
    if (!plan) {
      throw new AppError(
        ERROR_CODES.PLAN_NOT_FOUND,
        ERROR_MESSAGES.PLAN_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return plan;
  }

  async update(id: number, data: UpdatePlanDto) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.PLAN_NOT_FOUND,
        ERROR_MESSAGES.PLAN_NOT_FOUND,
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
        ERROR_CODES.PLAN_NOT_FOUND,
        ERROR_MESSAGES.PLAN_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.delete(id);
  }
}
