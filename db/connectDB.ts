
import {prisma} from "./prisma.ts";
import { ensureDatabase } from "./ensureDatabase.ts";
import log from '../src/utils/logger.ts';

export async function connectDB() {
  try {
    
    await ensureDatabase();

    
    await prisma.$connect();

    log.info("Prisma connected to PostgreSQL");
  } catch (error:any) {
    log.error(" DB connection error:", error.message);
    process.exit(1);
  }
}
