import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

//routes starts

router.route("/register")
.post(UserController.registerUser);

router.route("/login")
.post(UserController.loginUser);

//routes ends

export default router;