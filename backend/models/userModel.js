import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    cartData: {type:Object, default: {}},
}, {minimize: false});


const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;