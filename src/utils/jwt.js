import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}