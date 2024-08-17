import mongoose from "mongoose";

export default function () {
    mongoose.connect(process.env.MONGO_URI as string)
        .then(() => {
            console.log("Connected to mongoDB");
        })
        .catch((e) => {
            console.log(`Error : ${e}`);
        })
}