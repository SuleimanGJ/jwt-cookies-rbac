import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET)
}