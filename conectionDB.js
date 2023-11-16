import { createPool } from "mysql2/promise";
import configuration from "./configuration.js";

const CREATE_TABLE = `
CREATE TABLE peliculas (
    datos_peliculas INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    recaudacion_millones FLOAT NOT NULL DEFAULT 999999,
    ganancias_millones FLOAT NOT NULL DEFAULT 999999,
    secuela TINYINT NOT NULL DEFAULT false 
);

`;

const pool = createPool({
    host: configuration.HOST,
    port: configuration.PORT,
    user: configuration.USER,
    password: configuration.PASSWORD,
    database: configuration.NAME
});

 await pool.query(CREATE_TABLE);

console.log("Database connection started");

export default pool;