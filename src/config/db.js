import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB conncted");
    } catch(err) {
        console.log("DB failed");
        console.log(err);
        process.exit(1);
    }
}