import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Details from "../model/detailsModel.js";
import bcrypt from "bcryptjs"
import { generateJWT } from "../config/generateJWT.js";

export const signup = asyncHandler(async (req, res) => {
    try {
        const body = req.body;
        const userExists = await User.findOne({ email: body.email });

        if (userExists) {
            res.status(400).send("User Already Exists")
        }
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);

        const response = await User.create(body);
        res.status(200).send("User Created Successfully")
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

export const login = asyncHandler(async (req, res) => {
    try {
        const body = req.body;
        const userExists = await User.findOne({ email: body.email });

        if (!userExists) {
            res.status(400).send("User Doesn't Exist")
        }
        const checkPassword = await bcrypt.compare(body.password, userExists.password)
        if (checkPassword) {
            const token = generateJWT(userExists._id);
            return res.status(200).send({ "name": userExists.name, "email": userExists.email, "pic": userExists.pic, "token": token, "_id": userExists._id })
        } else {
            return res.status(400).send("Incorrect Password");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred while logging in");
    }
})

export const getUser = asyncHandler(async (req, res) => {
    try {
        const body = req.body;
        const response = await User.find(req.user._id)
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send(error);
    }
});


export const updateUser = asyncHandler(async (req, res) => {
    try {
        const body = req.body;
        const response = await User.findByIdAndUpdate({ _id: req.user._id }, body)
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send(error);
    }
});


export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        // Delete user
        const deleteUser = await User.findByIdAndDelete({ _id: userId });
        console.log(deleteUser)
        if (!deleteUser) {
            return res.status(404).send("User not found");
        }

        // Also delete associated profile
        const deleteProfile = await Details.findOneAndDelete(userId);

        return res.status(200).send("User Deleted Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}