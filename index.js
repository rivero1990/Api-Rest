import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


app.get("", (req,res)=>{
    res.send("<h1>Route get 1 used</h1>");
});

app.get("/api", (req,res)=>{
    console.log(req.query);
    res.send(`<h1>Route get 2 used</h1>`);
});

app.get("/api/:id", (req,res)=>{
    res.send(`<h1>Route get 3 used | id:${req.params.id}</h1>`);
});

app.get("/api/:id/:name", (req,res)=>{
    res.send(`<h1>Route get 4 used | id: ${req.params.id} name: ${req.params.name}</h1>`);
});

app.post("/api", (req,res)=>{
    console.log(req.query);
    res.send(`<h1>Create</h1>`);
});

app.put("/api", (req,res)=>{
    console.log(req.query);
    res.send(`<h1>Update</h1>`);
});

app.delete("/api", (req,res)=>{
    console.log(req.query);
    res.send(`<h1>Delete</h1>`);
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started in", process.env.PORT || 3000);
});

app.use((req, res)=>{
    res.send("<h1>Error</h1>");
});