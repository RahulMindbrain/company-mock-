import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loadEnv } from "../config/loadEnv.ts";
import { Request,Response } from "express";
//logger
import { requestLogger } from "./utils/middleware/requestLogger.ts";


//routes
import { companyRoutes } from "./company/routes/company.routes.ts";
import { planRoutes } from "./plans/routes/plan.routes.ts";
import { adminRoutes } from "./admin/routes/admin.routes.ts";

//middlewares
import deserializeAdmin from "./admin/middlewares/deserializeadmin.middlewares.ts";
import { errorHandler } from "./utils/middleware/errorHandler.ts";





loadEnv();

const app: Application = express();

//CORS ERROR
// app.use(
//   cors({
//     origin: `http://localhost:${config.get<number>("PORT")}`,
//     credentials: true,
//   })
// );

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeAdmin);
app.use(cookieParser());
app.use(requestLogger);
app.set("trust proxy", true);


//healthcheckroute
app.get("/healthcheck", (_req:Request, res) => {
  res.send("Server healthcheck-status: running");
});

// Routes
app.use('/company',companyRoutes());
app.use('/plan',planRoutes());
app.use('/admin',adminRoutes());


app.use(errorHandler)
export default app;
