import asyncHandler from "express-async-handler";
import Details from "../model/detailsModel.js";

export const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const response = await Details.findOne({ userId: req.user._id });
        console.log(response)
        res.status(200).send({ "message": "Successfully Fetched User Details", "response": response })


    } catch (error) {
        res.status(400).send({ "message": "Unable to Fetch Details", "error": error })
    }
})

export const addEyeCloser = asyncHandler(async (req, res) => {
    try {
        const { duration } = req.body;
        const userId = req.user._id;  // Make sure userId is defined

        let details = await Details.findOne({ userId });
        const timestamp = new Date();
        console.log(details);

        if (details === null) {
            // If no details exist, create a new Details document
            console.log("Creating new details");
            details = await Details.create({ userId, eyeClosures: [{ timestamp, duration }] });
        } else {
            // Add new eye closure data to the array
            details.eyeClosures.push({ timestamp, duration });
            await details.save();
        }

        res.status(200).send({ message: 'Eye closure data added successfully', response: details });
    } catch (error) {
        res.status(400).send({ message: "Unable to Update Details", error });
    }
});


export const addYawn = asyncHandler(async (req, res) => {
    try {
        const { duration } = req.body;
        const userId = req.user._id;  // Make sure userId is defined

        let details = await Details.findOne({ userId });
        const timestamp = new Date();
        console.log(details);

        if (details === null) {
            // If no details exist, create a new Details document
            console.log("Creating new details");
            details = await Details.create({ userId, yawns: [{ timestamp, duration }] });
        } else {
            // Add new eye closure data to the array
            details.yawns.push({ timestamp, duration });
            await details.save();
        }

        res.status(200).send({ message: 'Eye closure data added successfully', response: details });
    } catch (error) {
        res.status(400).send({ message: "Unable to Update Details", error });
    }
});


export const addmotorActivities = asyncHandler(async (req, res) => {
    try {
        const { speed, time } = req.body;
        const userId = req.user._id;  // Make sure userId is defined

        let details = await Details.findOne({ userId });
        const timestamp = new Date();
        console.log(details);

        if (details === null) {
            // If no details exist, create a new Details document
            console.log("Creating new details");
            details = await Details.create({ userId, motorActivities: [{ timestamp, duration }] });
        } else {
            // Add new eye closure data to the array
            details.motorActivities.push({ timestamp, speed, time });
            await details.save();
        }

        res.status(200).send({ message: 'Motor Activity data added successfully', response: details });
    } catch (error) {
        res.status(400).send({ message: "Unable to Update Details", error });
    }
});
