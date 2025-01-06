import User from "./models/userModel.js"
import bcrypt from 'bcryptjs';

export const adminSeeder = async()=>{
    // find if admin already exists in database

    const [adminExists] = await User.findAll({where : {
        userEmail : "admin@gmail.com",
    }})

    if(!adminExists){
        await User.create({
            userEmail : "admin@gmail.com",
            userPassword: bcrypt.hashSync("admin", 10),
            userName: "admin",
            role: "admin"
        })

        console.log("admin seeded successfully")
    }else{
        console.log("admin seeded already!")
    }

}