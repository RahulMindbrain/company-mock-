import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateAutonumDto } from "../dtos/autonum.create.dto";
import { UpdateAutonumDto } from "../dtos/autonum.update.dto";
import { AutonumRepository } from "../repositories/autonum.repository";

export class AutonumService {
  private readonly repo: AutonumRepository;

  constructor() {
    this.repo = new AutonumRepository();
  }

  async create(dto: CreateAutonumDto) {
    const existing = await this.repo.findByCompanyId(dto.companyId);

    if (existing) {
      throw new AppError(
        ERROR_CODES.AUTONUM_ALREADY_EXISTS,
        ERROR_MESSAGES.AUTONUM_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    return this.repo.create(dto);
  }


  async getByCompanyId(companyId: number) {
    const autonum = await this.repo.findByCompanyId(companyId);

    if (!autonum) {
      throw new AppError(
        ERROR_CODES.AUTONUM_NOT_FOUND,
        ERROR_MESSAGES.AUTONUM_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return autonum;
  }

  async increment(companyId: number): Promise<number> {
    const autonum = await this.repo.findByCompanyId(companyId);

    if (!autonum) {
      throw new AppError(
        ERROR_CODES.AUTONUM_NOT_FOUND,
        ERROR_MESSAGES.AUTONUM_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.incrementBarcode(companyId);
  }


  async update(companyId: number, dto: UpdateAutonumDto) {
    const autonum = await this.repo.findByCompanyId(companyId);

    if (!autonum) {
      throw new AppError(
        ERROR_CODES.AUTONUM_NOT_FOUND,
        ERROR_MESSAGES.AUTONUM_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.resetBarcode(companyId, dto.barcodeId);
  }
}
