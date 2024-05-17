import express, { json } from "express";
import connectDB from "./config/db.js";
import userRouter from "./Router/userRoutes.js";
import cors from "cors"
import dotenv from "dotenv";

connectDB();

const app = express();

app.use(cors())
app.use(json())
app.use("/api/user", userRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log("Server is Active at : ", PORT)
})



// ======================deployment=====================
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname1, "/client/build")))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running..");
//     });

// }
// ======================deployment=====================
