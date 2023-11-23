import express from "express";
import cors from "cors";
import moviesRoutes from "./routes/movies.routes.js";

const app = express();

const urlPermitted = ["http://127.0.0.1:5500"];

app.use(express.json());
app.use(cors({
    origin: (origin, callback)=>{
        console.log(origin);
        if (urlPermitted.includes(origin) || !origin) {
            callback(null, true);
        }else{
            const error = new Error("Error: Not allowed by CORS");
            error.status = 401;
            callback(error, false);
        }
    }
}));

app.use("/movies/", moviesRoutes);
app.use((req, res) => {
    res.send("<h1>Error : Route Not Found</h1>");
});

export default app;