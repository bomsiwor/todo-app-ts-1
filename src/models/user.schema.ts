import { model, Schema } from "mongoose";

// Types
interface IRegisterRequest {
    name: string,
    email: string,
    password: string
}

type TLoginRequest = Omit<IRegisterRequest, 'name'>

// Scheme
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

const User = model("User", userSchema);

export {
    User,
    IRegisterRequest,
    TLoginRequest
}