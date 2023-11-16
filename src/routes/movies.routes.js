import { Router } from "express";
import moviesControllers from "../controllers/movies.controllers.js";

const route = Router();

route.get("", moviesControllers.getMovies);
route.get("/:id", moviesControllers.getMovie);
route.post("", moviesControllers.createMovie);
route.put("", moviesControllers.updateMovie);
route.delete("", moviesControllers.deleteMovie);

export default route;