import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { CreateCompanyDto } from "../dtos/company.create.dto";
import { UpdateCompanyDto } from "../dtos/company.update.dto";
import { AppSuccess } from "../../utils/appSuccess";
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS, SUCCESS_CODES, SUCCESS_MESSAGES } from "../../utils/errors";
export class CompanyController {
  public service: CompanyService;

  constructor() {
    this.service = new CompanyService();
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateCompanyDto = req.body;

      const result = await this.service.create(dto);
        const response = new AppSuccess(
        SUCCESS_CODES.COMPANY_CREATED,
        SUCCESS_MESSAGES.COMPANY_CREATED,
        HTTP_STATUS.CREATED,
        result
      );

      return res.status(response.status).json(response);

    } catch (error: any) {
        const err = new AppError(
        ERROR_CODES.INVALID_COMPANY_DATA,
        error.message || ERROR_MESSAGES.INVALID_COMPANY_DATA,
        HTTP_STATUS.BAD_REQUEST
      );
      return res.status(err.status).json(err);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const result = await this.service.getAll();
        const response = new AppSuccess(
        SUCCESS_CODES.COMPANY_FETCHED,
        SUCCESS_MESSAGES.COMPANY_FETCHED,
        HTTP_STATUS.OK,
        result
      );
       return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        HTTP_STATUS.INTERNAL_ERROR
      );
      return res.status(err.status).json(err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result = await this.service.getOne(id);
      const response = new AppSuccess(
        SUCCESS_CODES.COMPANY_FETCHED,
        SUCCESS_MESSAGES.COMPANY_FETCHED,
        HTTP_STATUS.OK,
        result
      );

      return res.status(response.status).json(response);

    } catch (error: any) {
      const err = new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        error.message || ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
      return res.status(err.status).json(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto: UpdateCompanyDto = req.body;

      const result = await this.service.update(id, dto);
      const response = new AppSuccess(
        SUCCESS_CODES.COMPANY_UPDATED,
        SUCCESS_MESSAGES.COMPANY_UPDATED,
        HTTP_STATUS.OK,
        result
      );

      return res.status(response.status).json(response);

    } catch (error: any) {
      const err = new AppError(
        ERROR_CODES.INVALID_COMPANY_DATA,
        error.message || ERROR_MESSAGES.INVALID_COMPANY_DATA,
        HTTP_STATUS.BAD_REQUEST
      );
      return res.status(err.status).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await this.service.delete(id);
     const response = new AppSuccess(
        SUCCESS_CODES.COMPANY_DELETED,
        SUCCESS_MESSAGES.COMPANY_DELETED,
        HTTP_STATUS.OK,
        null
      );

      return res.status(response.status).json(response);

    } catch (error: any) {
      const err = new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        error.message || ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
      return res.status(err.status).json(err);
    }
  }
}
