import express from "express";
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/users", userRouter)

connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server running at ${PORT}`);
    })
})