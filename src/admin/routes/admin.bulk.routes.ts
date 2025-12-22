import express from "express";
import { requireAdmin } from "../middlewares/requiredUser";
import { ProductImportController } from "../controller/admin.productImport.controller";
import { upload } from "../../utils/middleware/multerupload";

const Route = express.Router();

const controller = new ProductImportController();

export function productImportRoutes() {

  Route.post(
    "/api/admin/products/import",
    requireAdmin,
    upload.single("file"),
    controller.importFromExcel.bind(controller)
  );

  return Route;
}
