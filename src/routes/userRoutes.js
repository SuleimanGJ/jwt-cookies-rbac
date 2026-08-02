import express from "express";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    // take from user inputs
    // validate inputs using zod
    // check if the user exists
        // if yes, return error already exists
        // if not,
            // save to db
            // hash the password using bcrypt
            // send the response to the user
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
});

export {userRouter}