import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/dotenv.js";

class UserController{
    async registerUser(req, res){
        const {userName, userEmail, userPassword, role} = req.body;
        // validation
        if(!userName || !userEmail || !userPassword){
            res.status(400).json({
                success: false,
                message: "Please fill all the required fields to register"
            })
            return
        }

        // is already registered
        const [isRegistered] = await User.findAll({
            where: {
                userEmail
            }
        })

        if(isRegistered){
            res.status(401).json({
                success: false,
                message: "Duplication not allowed(User with the given email has already been registered)"
            })
        }
      // create user

     const newUser =  await User.create({
        userName,
        userEmail,
        userPassword : bcrypt.hashSync(userPassword, 10),
        role: role
      })

      res.status(200).json({
        success: true,
        message: "User registered successfully"
      })
    }

    async loginUser(req, res){
        const {userEmail, userPassword} = req.body;

        // validation

        if(!userEmail || !userPassword){
            res.status(400).json({
                success: false,
                message: "please provide email and password to login"
            })
            return
        }

        const [isEmail] = await User.findAll({
            where: {
                userEmail
            }
        })

        if(!isEmail){
            res.status(400).json({
                success: false,
                message: "No user is registered with this email"
            })
            return
        }

        const isPassword = bcrypt.compareSync(userPassword, isEmail.userPassword);

        if(!isPassword){
            res.status(403).json({
                success: false,
                message: "Email or password is incorrect"
            })
            return
        }

        const token = jwt.sign({id:isEmail.id}, SECRET_KEY, {expiresIn: "2h"})

        res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            data: token
        })


    }
}

export default new UserController();