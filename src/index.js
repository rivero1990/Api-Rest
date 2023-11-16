import configuration from "./configuration.js";
import app from "./app.js";


app.listen( configuration.PORT, () => {
    console.log("Server started in", configuration.PORT);
});
