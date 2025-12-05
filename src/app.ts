import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loadEnv } from "../config/loadEnv.ts";

//logger
import { requestLogger } from "./utils/middleware/requestLogger.ts";

//routes
import { companyRoutes } from "./company/routes/company.routes.ts";
import { planRoutes } from "./plans/routes/plan.routes.ts";
import { adminRoutes } from "./admin/routes/admin.routes.ts";






loadEnv();

const app: Application = express();

// app.use(
//   cors({
//     origin: `http://localhost:${config.get<number>("PORT")}`,
//     credentials: true,
//   })
// );

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);


//healthcheckroute
app.get("/healthcheck", (_req, res) => {
  res.send("Server healthcheck-status: running");
});

// Routes
app.use('/company',companyRoutes());
app.use('/plan',planRoutes());
app.use('/admin',adminRoutes());


export default app;
