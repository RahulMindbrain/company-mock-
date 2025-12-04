import express from "express";
import { CompanyController } from "../controller/company.controller";
const Route = express.Router();
const controller = new CompanyController();

export function companyRoutes() {
  Route.post("/api/create",controller.create.bind(controller));
  Route.get("/api/get", controller.getAll.bind(controller));
  Route.get("/api/:id/get", controller.getOne.bind(controller));
  Route.put("/api/:id/edit", controller.update.bind(controller));
  Route.delete("/api/:id/delete", controller.delete.bind(controller));

  return Route;
}


