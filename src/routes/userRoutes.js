import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { UserModel } from "../models/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { REFRESH_TOKEN_SECRET } from "../config/config.js";
const userRouter = express.Router();


const signupSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(30),
});

const signinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

userRouter.post("/signup", async (req, res) => {
    // take from user inputs
    // validate inputs using zod
    // check if the user exists
        // if yes, return error already exists
        // if not,
            // save to db
            // hash the password using bcrypt
            // send the response to the user

    try {
        console.log(req.body)
        const result = signupSchema.safeParse(req.body);
        console.log(result)
        if (!result.success) {
            return res.status(400).json({
                errors: result.error.flatten(),
            });
        }

        // Validated data
        // const data = result.data;
        const { username, email, password } = result.data;
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({ username, email: email.toLowerCase(), password: hashedPassword });

        res.status(201).json({ message: "Signed up successfully", user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error, something went wrong" })
    }
});


userRouter.post("/signin", async (req, res) => {
    // take from user inputs
    // validate inputs using zod
    // check if the user exists
    // if not, return error doesnot exists
    // if yes,
    // compare the password the plain one and the hashed one, using bcrypt
    // generate jwt
    // send the response to the user

    try {
        const result = signinSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.flatten(),
            });
        }

        const { email, password } = result.data;
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() })

        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatched = await bcrypt.compare(password, existingUser.password)

        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = generateAccessToken(existingUser._id);
        const refreshToken = generateRefreshToken(existingUser._id);

        res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // true when using HTTPS
            })
            .json({
                message: "User successfully signed in",
                accessToken
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error, something went wrong"});
    }
});

userRouter.get("/me", async (req, res) => {
    res.json({message: "me"})
})
userRouter.get("/profile", verifyToken, async (req, res) => {
    res.json({ message: "Profile"})
})


userRouter.post("/refresh", (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    try {

        const decoded = jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET
        );

        const accessToken = generateAccessToken(decoded.id);

        return res.status(200).json({
            accessToken
        });

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired refresh token"
        });

    }
});

export { userRouter };
