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


/**
 * Create a movie in the database
 * @param {*} req of the consultation
 * @param {*} res of the consultation
 */
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


/**
 * Updated Delete a movie from the database
 * @param {*} req of the consultation
 * @param {*} res of the consultation
 */
async function updateMovie(req, res) {

    const ID = req.params.id;

    try {
        const { nombre, recaudacion_millones, ganancias_millones, secuela } = req.body;
        const [info] = await pool.query(`UPDATE peliculas SET nombre = ?, recaudacion_millones = ?, ganancias_millones = ?, secuela = ? WHERE datos_peliculas = ?;`
            , [nombre, recaudacion_millones, ganancias_millones, secuela, ID]);
            
            if (info.affectedRows !== 1 || info.warningStatus) {
                res.status(404).json({
                    info: "Error updating the movie with id: "+ ID
                });
            }else{
                res.json({
                    info: "Updated Movie"
                });
            }
    } catch (error) {
        res.status(500).json({
            report: "Something went wrong when updating the movie with id"+ ID,
            error: error
        })
    }
};


/**
 * Delete a movie from the database
 * @param {*} req of the consultation
 * @param {*} res of the consultation
 */
async function deleteMovie(req, res) {

    const ID = [req.params.id];
    
    try {
        const [result] = await pool.query("DELETE FROM peliculas WHERE datos_peliculas = ?;", [ID]);
        if (result.affectedRows !== 1) {
            res.status(404).json({
                info: "The film was not found with datos_peliculas : " + ID
            });
        } else {
            res.json({
                info: "Movie with id " + ID + " deleted"
            });
        }
    } catch (error) {
        res.status(500).json({
            report: "Something Went Wrong",
            error: error
        })
    }
};


export default {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}