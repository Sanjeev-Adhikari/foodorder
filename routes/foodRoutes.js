import express from "express";
import { handleErrors } from "../middlewares/catchAsync.js";
import foodController from "../controllers/foodController.js";
import authenticate from "../middlewares/authenticate.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/add-food")
.post( authenticate.isAuthenticated, authenticate.restrictTo("admin"), singleUpload, handleErrors(foodController.createFood));

router.route("/").get(handleErrors(foodController.getAllFoodItems))

router.route("/:id")
.get(handleErrors(foodController.getSingleFoodItem))
.patch(authenticate.isAuthenticated, authenticate.restrictTo("admin"), singleUpload, handleErrors(foodController.updateFoodItem))
.delete(authenticate.isAuthenticated, authenticate.restrictTo("admin"), handleErrors(foodController.deleteFoodItem))

export default router