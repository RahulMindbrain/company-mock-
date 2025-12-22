import { Request, Response } from "express";
import "reflect-metadata";
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
import { ProductImportService } from "../services/admin.bulk.service";


export class ProductImportController {
  public service: ProductImportService;

  constructor() {
    this.service = new ProductImportService();
  }

  async importFromExcel(req: Request, res: Response) {
    try {
      if (!req.file?.buffer) {
        throw new AppError(
          ERROR_CODES.DATA_INSUFFICIENT,
          ERROR_MESSAGES.DATA_INSUFFICIENT,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const adminId = res.locals.user.id;
      const companyId = Number(req.body.companyId);

      const result = await this.service.importFromExcel(
        req.file.buffer,
        adminId,
        companyId
      );

      const response = new AppSuccess(
        SUCCESS_CODES.PRODUCTS_IMPORTED,
        SUCCESS_MESSAGES.PRODUCTS_IMPORTED,
        HTTP_STATUS.CREATED,
        result
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      log.error(error);

      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }
}
