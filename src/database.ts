import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, DB, DB_TEST, USER, PASSWORD, NODE_ENV } = process.env;
let client: Pool;

if (NODE_ENV === "test") {
  client = new Pool({
    host: HOST,
    database: DB_TEST,
    user: USER,
    password: PASSWORD,
  });
} else {
  client = new Pool({
    host: HOST,
    database: DB,
    user: USER,
    password: PASSWORD,
  });
}

export default client;
