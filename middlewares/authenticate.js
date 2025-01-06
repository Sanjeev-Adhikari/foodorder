import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/dotenv.js";
import User from "../models/userModel.js";
import {promisify} from "util"
class AuthenticationMiddleware{
    async isAuthenticated(req, res, next){
        const token = req.headers.authorization
        if(!token || token === undefined){
            res.status(403).json({
                success: false,
                message: "Please provide token"
            })
            return
        }

        // verify token
        try {
            const decoded = await promisify(jwt.verify)(token, SECRET_KEY)
            const userExists = await User.findOne({_id: decoded._id})
            if(!userExists){
                return res.status(404).json({
                    success: false,
                    message: "User with that token doesnot exists"
                })
            }

            req.user = userExists
            
            next();

           } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
           }
        } 
    
        restrictTo(...roles) {
            return (req, res, next) => {
                const userRole = req.user?.dataValues?.role;
                console.log("User role:", userRole);
                console.log("Allowed roles:", roles);
                console.log("Condition check:", roles.includes(userRole)); 
        
                if (!roles.includes(userRole)) {
                    console.log("Access denied for role:", userRole); 
                    return res.status(403).json({
                        success: false,
                        message: "You don't have permission to do this",
                    });
                }
        
                console.log("Access granted for role:", userRole); 
                next();
            };
        }
        
        
}

export default new AuthenticationMiddleware();