import app from "./app.ts";
import { connectDB } from "../db/connectDB.ts";
import config from "../config/index.ts";
import log from '../src/utils/logger.ts';

const start = async () => {
  try {
    
    await connectDB();
    log.info("DB Connected");

    
    app.listen(config.PORT, () => {
      log.info(`Server running at http://localhost:${config.PORT}`);
    });
  } catch (err:any) {
    log.error("Startup error:", err);
    process.exit(1);
  }
};

start();
