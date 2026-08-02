import express from "express";
import { userRouter } from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
const app = express();

app.use("/users", userRouter)

connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server running at ${PORT}`);
    })
})