import { createPool } from "mysql2/promise";
import configuration from "./configuration.js";

const pool = createPool({
    host: configuration.HOST,
    port: configuration.PORT,
    user: configuration.USER,
    password: configuration.PASSWORD,
    database: configuration.NAME
});


console.log("Database connection started");

export default pool;