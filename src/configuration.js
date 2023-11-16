import { config } from "dotenv";

config();

const HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const USER= process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;
const PORT = process.env.PORT;


export default {
    DB_PORT,
    HOST,
    USER,
    PASSWORD,
    NAME,
    PORT
}