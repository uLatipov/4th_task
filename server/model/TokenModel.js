import mongoose, { Schema, model } from "mongoose";

const TokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        rel: "User",
    },
});

export default model("Token", TokenSchema);
