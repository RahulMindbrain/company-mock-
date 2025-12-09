import express from "express";
import { AdminController } from "../controller/admin.controller";
import { AdminsessionHandler } from "../controller/session.controller";
import log from "../../utils/logger";
import { requireAdmin } from "../middlewares/requiredUser";



const Route = express.Router();
const controller = new AdminController();
const adminAuth = new AdminsessionHandler();

export function adminRoutes() {
  // log.info("Hello World")
  //crud
  Route.post("/api/signup",controller.create.bind(controller));
  Route.get("/api/get" ,controller.getAll.bind(controller));
  Route.get("/api/:id/get", controller.getOne.bind(controller));
  Route.put("/api/:id/edit", requireAdmin ,controller.update.bind(controller));
  Route.delete("/api/:id/delete", requireAdmin ,controller.delete.bind(controller));

  //auth
  Route.post("/api/signin",adminAuth.createSession.bind(adminAuth));
  Route.get("/api/getsession",requireAdmin ,adminAuth.getUserSessionsHandler.bind(adminAuth));

  Route.delete('/api/delete/session', requireAdmin ,adminAuth.deleteSessionHandler.bind(adminAuth));

  return Route;
}


