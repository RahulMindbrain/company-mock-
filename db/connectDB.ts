
import {prisma} from "./prisma.ts";
import { ensureDatabase } from "./ensureDatabase.ts";
import log from '../src/utils/logger.ts';

export async function connectDB() {
  try {
    
    //await ensureDatabase();

    
    await prisma.$connect();

    log.info("Prisma connected to PostgreSQL [neon db]");
  } catch (error:any) {
    log.error(" DB connection error:", error);
    process.exit(1);
  }
}
