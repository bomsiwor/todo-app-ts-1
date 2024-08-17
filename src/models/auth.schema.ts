import { model, Schema } from "mongoose";

const authSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: String
})

const Auth = model("Auth", authSchema);

export {
    Auth
}