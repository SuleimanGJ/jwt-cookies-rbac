import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RefreshTokenSchema = new Schema({
    userId: { type: ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);

export { RefreshTokenModel };