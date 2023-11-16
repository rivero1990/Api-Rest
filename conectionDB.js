import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "charliecanela456$",
    database: "recaudacion_peliculas"
});

console.log("Database connection started");

export default pool;