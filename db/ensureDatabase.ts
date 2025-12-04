// src/db/ensureDatabase.ts
import { Client } from "pg";
import config from '../config/index.ts';
import log from '../src/utils/logger.ts';

export async function ensureDatabase() {
  const DB_URL = config.DB_URL;
  const DB_NAME = config.DB_NAME;
  const DB_PASS = config.DB_PASS;


  const db = new URL(DB_URL);

  const client = new Client({
    host: db.hostname,
    user: db.username,
    password: DB_PASS,
    port: Number(db.port) || 5432,
    database: "postgres",
  });

  await client.connect();

  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [DB_NAME]
  );

  if (result.rowCount === 0) {
    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    log.info(`Created PostgreSQL database "${DB_NAME}"`);
  } else {
    log.info(`Database "${DB_NAME}" already exists`);
  }

  await client.end();
}
