import XLSX from "xlsx";
import { ProductRepository } from "../../product/repositories/product.repository";
import { AppError } from "../../utils/appError";
import {
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
} from "../../utils/errors";
import { RecordStatus } from "@prisma/client";
import { AutonumRepository } from "../../autonum/repositories/autonum.repository";

export class ProductImportService {
  private readonly repo: ProductRepository;
  private readonly autonumrepo: AutonumRepository;

  constructor() {
    this.repo = new ProductRepository();
    this.autonumrepo = new AutonumRepository();
  }

  async importFromExcel(
    buffer: Buffer,
    adminId: number,
    companyId: number
  ) {
    if (!companyId) {
      throw new AppError(
        ERROR_CODES.COMPANY_NOT_FOUND,
        ERROR_MESSAGES.COMPANY_NOT_FOUND,
        HTTP_STATUS.UNPROCESSABLE_ENTITY
      );
    }

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: null });

    if (!rows.length) {
      throw new AppError(
        ERROR_CODES.DATA_INSUFFICIENT,
        ERROR_MESSAGES.DATA_INSUFFICIENT,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    let inserted = 0;
    const errors: { row: number; error: string }[] = [];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const rowNo = index + 2;

      try {
        if (!row.ProductName || !row.BrandId || !row.SizeValue || !row.SizeUnit) {
          throw new Error(ERROR_MESSAGES.VALIDATION_ERROR);
        }

        const normalizedProductName = String(row.ProductName)
          .trim()
          .toLowerCase();

        const sizeValue = Number(row.SizeValue);
        const sizeUnit = row.SizeUnit;
        const sizeKey = `${sizeValue}_${sizeUnit}`;

        if (!Number.isFinite(sizeValue)) {
          throw new Error(ERROR_MESSAGES.VALIDATION_ERROR);
        }

       
        const existingBarcode =
          await this.repo.findExistingProductBarcode({
            companyId,
            brandId: Number(row.BrandId),
            productname: normalizedProductName,
            size: sizeKey,
          });

        let barcodeId: number;

        if (existingBarcode) {
          barcodeId = existingBarcode.barcodeId;
        } else {
          barcodeId = await this.autonumrepo.incrementBarcode(companyId);

          await this.repo.feedProductBarcode(
            companyId,
            Number(row.BrandId),
            normalizedProductName,
            sizeKey,
            barcodeId
          );
        }

        await this.repo.createProduct(
          {
            productname: normalizedProductName,
            sku: row.SKU ?? undefined,

            companyId,
            brandId: Number(row.BrandId),
            categoryId: row.CategoryId ? Number(row.CategoryId) : undefined,

            barcodeId,
            barcode: row.Barcode ?? undefined,

            sizeValue,
            sizeUnit,

            hsncode: row.HSNCode ?? undefined,
            dp: row.DP ? Number(row.DP) : undefined,
            mrp: row.MRP ? Number(row.MRP) : undefined,
            taxPercent: row.TaxPercent
              ? Number(row.TaxPercent)
              : undefined,
            stock: row.Stock ? Number(row.Stock) : undefined,
            description: row.Description ?? undefined,
            spe: row.SPE ?? undefined,
            BV: row.BV ? Number(row.BV) : undefined,
            mainImg: row.MainImg ?? undefined,
            otherImgs: row.OtherImgs
              ? String(row.OtherImgs).split(",")
              : [],

            status: RecordStatus.ACTIVE,
          },
          adminId
        );

        inserted++;
      } catch (e) {
        errors.push({
          row: rowNo,
          error: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
    }

    if (!inserted) {
      throw new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        ERROR_MESSAGES.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY
      );
    }

    return {
      inserted,
      failed: errors.length,
      errors,
    };
  }
}
