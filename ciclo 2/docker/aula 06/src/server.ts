import { App } from "./app.js";
import { config } from "dotenv";

config()

new App().server.listen(process.env.PORT, () => {
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
})