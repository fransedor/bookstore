import { Pool } from "pg";

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const dbName = process.env.DB_DATABASE_NAME;

const pool = new Pool({
  host,
  user: username,
  password,
  port: Number(port),
  database: dbName,
});

export const query = (text: string, values?: string[]) => pool.query(text, values);
