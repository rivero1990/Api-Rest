import express from "express";
import cors from "cors";
import moviesRoutes from "./routes/movies.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/movies/", moviesRoutes);


app.use((req, res) => {
    res.send("<h1>Error</h1>");
});

export default app;