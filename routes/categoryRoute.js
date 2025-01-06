import express from "express";
import { handleErrors } from "../middlewares/catchAsync.js";
import categoryController from "../controllers/categoryController.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

// routes
router.route("/add-category")
.post(authenticate.isAuthenticated, authenticate.restrictTo("admin"), handleErrors(categoryController.createCategory))

router.route("/")
.get(handleErrors(categoryController.getAllCategories))

router.route("/:id")
.get(handleErrors(categoryController.getSingleCategory))
.delete(authenticate.isAuthenticated, authenticate.restrictTo("admin"), handleErrors(categoryController.deleteCategory))
// routes

export default router