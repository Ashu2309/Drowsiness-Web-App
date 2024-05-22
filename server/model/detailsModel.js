import mongoose from "mongoose";

const { Schema, model } = mongoose;

const detailsSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'DrowsinessUser', required: true },
        eyeClosures: [{
            timestamp: { type: Date, required: true, default: Date.now() },
            duration: { type: Number, required: true, default: 5 } // duration in seconds
        }],
        yawns: [{
            timestamp: { type: Date, required: true, default: Date.now() },
            duration: { type: Number, required: true, default: 3 } // duration in seconds
        }],
        motorActivities: [{
            timestamp: { type: Date, required: true, default: Date.now() },
            speed: { type: Number, required: true, default: 0 },
            time: { type: Number, required: true, default: 0 }
        }]
    },
    { timestamps: true }
);



const Details = model("details", detailsSchema);

export default Details;
