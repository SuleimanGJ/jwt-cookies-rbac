import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };