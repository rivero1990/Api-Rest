import express from "express";

const app = express();


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

app.listen(3000, ()=>{
    console.log("Server started");
});

app.use((req, res)=>{
    res.send("<h1>Error</h1>");
});