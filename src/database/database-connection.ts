import pg from "pg";
import "dotenv/config";
import { Config } from "../protocols/database.js";

const { Pool } = pg;

const configDatabase: Config = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};

if (process.env.MODE === "prod") {
    configDatabase.ssl = true;
}

export const db = new Pool(configDatabase);
