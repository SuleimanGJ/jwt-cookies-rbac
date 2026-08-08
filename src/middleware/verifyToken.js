import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRETT } from "../config/config.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized"})
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRETT);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export {verifyToken};