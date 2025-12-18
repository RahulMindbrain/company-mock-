import express from "express";
import { AutonumController } from "../controller/autonum.controller";
import { requireAdmin } from "../../admin/middlewares/requiredUser";

const controller = new AutonumController();

export function autonumRoutes() {
  const Route = express.Router();
  Route.post("/api/create",requireAdmin,controller.create.bind(controller));
  Route.get("/api/:id/get",requireAdmin, controller.getByCompanyId.bind(controller));
  Route.put("/api/:id/edit",requireAdmin, controller.increment.bind(controller));
  Route.delete("/api/:id/delete", requireAdmin,controller.update.bind(controller));

  return Route;
}


