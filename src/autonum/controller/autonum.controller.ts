import { Request, Response } from "express";
import { AutonumService } from "../services/autonum.service";
import { AppSuccess } from "../../utils/appSuccess";
import { AppError } from "../../utils/appError";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
} from "../../utils/errors";
import log from "../../utils/logger";
import { CreateAutonumDto } from "../dtos/autonum.create.dto";
import { UpdateAutonumDto } from "../dtos/autonum.update.dto";

export class AutonumController {
  public service: AutonumService;

  constructor() {
    this.service = new AutonumService();
  } 


  async create(req: Request, res: Response) {
    try {
      const dto: CreateAutonumDto = req.body;
      log.info("Create AutoNumber for companyId: " + dto.companyId);

      const result = await this.service.create(dto);
      const response = new AppSuccess(
        SUCCESS_CODES.AUTONUM_CREATED,
        SUCCESS_MESSAGES.AUTONUM_CREATED,
        HTTP_STATUS.CREATED,
        result
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }

 
  async getByCompanyId(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.companyId);

      const result = await this.service.getByCompanyId(companyId);
      const response = new AppSuccess(
        SUCCESS_CODES.AUTONUM_FETCHED,
        SUCCESS_MESSAGES.AUTONUM_FETCHED,
        HTTP_STATUS.OK,
        result
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }


  async increment(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.companyId);

      const barcodeId = await this.service.increment(companyId);
      const response = new AppSuccess(
        SUCCESS_CODES.AUTONUM_INCREMENTED,
        SUCCESS_MESSAGES.AUTONUM_INCREMENTED,
        HTTP_STATUS.OK,
        { barcodeId }
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }


  async update(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.companyId);
      const dto: UpdateAutonumDto = req.body;

      const result = await this.service.update(companyId, dto);
      const response = new AppSuccess(
        SUCCESS_CODES.AUTONUM_UPDATED,
        SUCCESS_MESSAGES.AUTONUM_UPDATED,
        HTTP_STATUS.OK,
        result
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }
}
