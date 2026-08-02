import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    username:  {
        type: String,
        unique: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };