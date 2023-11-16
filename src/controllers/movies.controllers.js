import pool from "../conectionDB.js";

pool
 
 async function getMovies (req, res) {
    try {
        console.log(req.params);
        const result = await pool.query("SELECT * FROM peliculas");
        res.json(result);
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error:error
        })
    }
};


 async function getMovie (req, res)  {
    const result = await pool.query("SELECT * FROM peliculas WHERE datos_peliculas = ?", [req.params.id]);
    console.log(result);
    res.json(result);
};


async function createMovie (req, res) {
    res.status(201).json(req.body);
};

async function updateMovie (req, res) {
    res.json(`<h1>Update</h1>`);
};

async function deleteMovie (req, res) {
    res.json(`<h1>Delete</h1>`);
};

export default {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}