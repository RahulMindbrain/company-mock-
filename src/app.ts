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
import { categoryRoutes } from "./category/routes/category.routes.ts";
import { brandRoutes } from "./brand/routes/brand.routes.ts";
import { productRoutes } from "./product/routes/product.routes.ts";
import { autonumRoutes } from "./autonum/routes/autonum.routes.ts";
import { productImportRoutes } from "./admin/routes/admin.bulk.routes.ts";


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
app.use(cookieParser());
app.use(deserializeAdmin);
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
app.use('/category',categoryRoutes());
app.use('/brand',brandRoutes());
app.use('/product',productRoutes());
app.use('/autonum',autonumRoutes());
app.use('/bulk',productImportRoutes());

app.use(errorHandler)
export default app;
