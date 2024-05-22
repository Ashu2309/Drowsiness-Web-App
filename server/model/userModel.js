import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pic: {
            type: String,
            required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        location: { type: String },
        phone: { type: String },
        age: { type: String },
        vehicle: { type: String },
        gender: { type: String }

    },
    { timestamps: true }
);



const User = model("DrowsinessUser", userSchema);

export default User;
