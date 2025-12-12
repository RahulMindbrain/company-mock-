import express from "express";
import { BrandController } from "../controller/brand.controller";
import { requireAdmin } from "../../admin/middlewares/requiredUser";

const controller = new BrandController();

export function brandRoutes() {
  const Route = express.Router();
  Route.post("/api/create",requireAdmin,controller.create.bind(controller));
  Route.get("/api/get",requireAdmin, controller.getAll.bind(controller));
  Route.get("/api/:id/get",requireAdmin, controller.getOne.bind(controller));
  Route.put("/api/:id/edit",requireAdmin, controller.update.bind(controller));
  Route.delete("/api/:id/delete", requireAdmin,controller.delete.bind(controller));

  return Route;
}


