import express from "express";
import * as detailsController from "../controllers/detailsController.js"
import { Auth } from "../middleware/Auth.js";
const router = express.Router()

router.route("/").get(Auth, detailsController.getUserDetails)
router.route("/addeyeclosure").put(Auth, detailsController.addEyeCloser)
router.route("/addyawn").put(Auth, detailsController.addYawn)
router.route("/addmotoractivities").put(Auth, detailsController.addmotorActivities)




export default router;