import { JWT_SECRET } from "../config/config.js"


export const generateAccessToken = (userId) => {
    jwt.sign({ id: userId }, JWT_SECRET)
}