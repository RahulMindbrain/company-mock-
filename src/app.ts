import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loadEnv } from "../config/loadEnv.ts";

import { requestLogger } from "./utils/middleware/requestLogger.ts";
import { companyRoutes } from "./company/routes/company.routes.ts";






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



app.get("/healthcheck", (_req, res) => {
  res.send("Server healthcheck-status: running");
});

// Routes
app.use('/',companyRoutes());

export default app;
