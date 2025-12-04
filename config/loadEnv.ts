import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import z from "zod";

export function loadEnv() {
  const env = process.env.NODE_ENV || "development";

  const envFile = path.resolve(process.cwd(), `env/.env.${env}`);

  if (fs.existsSync(envFile)) {
    console.log(`➡ Loading environment: ${env}`);
    dotenv.config({ path: envFile });
  } else {
    console.warn(`⚠ .env file not found for NODE_ENV=${env}: ${envFile}`);
  }

  const envSchema = z.object({
    MODE: z.enum(["development", "staging", "production"]),
    PORT: z.string().regex(/^\d+$/),
    DB_URL: z.string().url(),
    DB_NAME:z.string(),
    DB_PASS:z.string(),
    SALT_WORK_FACTOR: z.string().regex(/^\d+$/),
    ACCESS_TOKEN_TTL: z.string(),
    REFRESH_TOKEN_TTL: z.string(),
    JWT_SECRET: z.string().min(32).optional(),
    ACCESS_TOKEN_PUBLIC_KEY: z.string().optional(),
    ACCESS_TOKEN_PRIVATE_KEY: z.string().optional(),
    REFRESH_TOKEN_PUBLIC_KEY: z.string().optional(),
    REFRESH_TOKEN_PRIVATE_KEY: z.string().optional(),
  });

  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsedEnv.error.format()
    );
    process.exit(1);
  }

  return parsedEnv.data;
}
