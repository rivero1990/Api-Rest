import pool from "../conectionDB.js";



/**
 * Returns all movies if they exist
 * @param {*} req of the consultation
 * @param {*} res of the consultation
 */
async function getMovies(req, res) {
    try {
        const result = await pool.query("SELECT * FROM peliculas");
        if (!result.length) {
            res.status(404).json(
                {
                    message: "No Movies Found"
                }
            )
        } else {
            res.json(result[0]);
        }
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error: error
        })
    }
};


async function getMovie(req, res) {
    const ID = [req.params.id];
    try {
        const [result] = await pool.query("SELECT * FROM peliculas WHERE datos_peliculas = ?", ID);
        if (!result.length) {
            res.status(404).json({
                info: "The film was not found with datos_peliculas:" + ID
            });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error: error
        })
    }
};


async function createMovie(req, res) {
    const { nombre, recaudacion_millones, ganancias_millones, secuela } = req.body;

    try {
        const [info] = await pool.query(`INSERT INTO peliculas(nombre, recaudacion_millones , ganancias_millones , secuela) VALUES(?, ?, ?, ?);`
            , [nombre, recaudacion_millones, ganancias_millones, secuela]);
        const [result] = await pool.query("SELECT * FROM peliculas WHERE datos_peliculas = ?;", [info.insertId]);
        console.log(info.affectedRows);
        if (info.affectedRows !== 1 || !result.length) {
            res.status(404).json({
                message: "Error when adding movie"
            });
        } else {
            res.status(201).json({
                newId: info.insertId,
                movie: result
            });
        }

    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error: error
        })
    }
};

async function updateMovie(req, res) {
    res.json(`<h1>Update</h1>`);
};

async function deleteMovie(req, res) {
    res.json(`<h1>Delete</h1>`);
};

export default {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}