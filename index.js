import express from "express";
import cors from "cors";
import pool from "./conectionDB.js";

const app = express();

app.use(express.json());
app.use(cors());


app.get("", async (req, res) => {
    const result = await pool.query("SELECT * FROM peliculas");
    console.log(result);
    res.json(result);
});

app.get("/api", (req, res) => {
    console.log(req.query);
    res.send(`<h1>Route get 2 used</h1>`);
});

app.get("/api/:id", async (req, res) => {
    try {
        console.log(req.params);
        const result = await pool.query("SELECT * FROM peliculas WHERE datos_peliculas = ?", [req.params.id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error:error
        })
    }
});


app.get("/api/:id/:name", (req, res) => {
    res.send(`<h1>Route get 4 used | id: ${req.params.id} name: ${req.params.name}</h1>`);
});

app.post("/api", (req, res) => {
    console.log(req.query);
    res.status(201).send(`<h1>Create</h1>`);
});

app.put("/api", (req, res) => {
    console.log(req.query);
    res.send(`<h1>Update</h1>`);
});

app.delete("/api", (req, res) => {
    console.log(req.query);
    res.send(`<h1>Delete</h1>`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started in", process.env.PORT || 3000);
});

app.use((req, res) => {
    res.send("<h1>Error</h1>");
});