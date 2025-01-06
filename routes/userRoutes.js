import express from 'express';
import UserController from '../controllers/userController.js';
import { handleErrors } from '../middlewares/catchAsync.js';

const router = express.Router();

//routes starts

router.route("/register")
.post(handleErrors(UserController.registerUser));

router.route("/login")
.post(handleErrors(UserController.loginUser));

//routes ends

export default router;