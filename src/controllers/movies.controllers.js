import pool from "../conectionDB.js";

 

/**
 * Returns all movies if they exist
 * @param {*} req of the consultation
 * @param {*} res of the consultation
 */
 async function getMovies (req, res) {
    try {
        const result = await pool.query("SELECT * FROM peliculas");
        if (!result.length) {
            res.status(404).json(
                {
                    message:"No Movies Found"
                }
            )
        }else{
            res.json(result[0]); 
        }
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error:error
        })
    }
};


 async function getMovie (req, res)  {
    const ID = [req.params.id];
    const result = await pool.query("SELECT * FROM peliculas WHERE datos_peliculas = ?", ID);
    if (!result.length) {
        res.status(404).json({
            info: "The film was not found with datos_peliculas:"+ ID
        });
    }else{
        res.json(result);
    }
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