import express from "express";
import { AdminController } from "../controller/admin.controller";
const Route = express.Router();
const controller = new AdminController();

export function adminRoutes() {
  Route.post("/api/create",controller.create.bind(controller));
  Route.get("/api/get", controller.getAll.bind(controller));
  Route.get("/api/:id/get", controller.getOne.bind(controller));
  Route.put("/api/:id/edit", controller.update.bind(controller));
  Route.delete("/api/:id/delete", controller.delete.bind(controller));

  return Route;
}


