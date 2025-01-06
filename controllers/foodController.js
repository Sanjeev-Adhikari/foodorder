import {rm, unlink} from "fs";
import Food from "../models/foodModel.js"
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import { promisify } from "util";

const unlinkAsync = promisify(unlink);

class FoodController{
    async createFood(req, res){
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const {userId} = req.user;
        const{foodName, foodDescription, foodPrice, categoryId} = req.body;

        const image = req.file;
        

        if(!image){
            res.status(400).json({
                success: false,
                message: "Please provide image"
            })
            return;
        }

        if(!foodName || !foodDescription || !foodPrice || !categoryId ){
            rm(image.path, (err)=>{
                if(err){
                    console.error("Failed to delete image:", err);

                }else{
                    console.log("image deleted due to validation failure");
                }
            });
            res.status(400).json({
                success: false,
                message: "please provide the required fields",
            });
            return;
        }

        const newFood = await Food.create({
            foodName,
            foodDescription,
            foodPrice,
            image: image.path,
            userId : userId,
            categoryId: categoryId
            
        });
        res.status(200).json({
            success: true,
            message: "Food item created successfully",
            data: newFood
        })


    }

    async getAllFoodItems(req, res){
        const foodItems = await Food.findAll({
            include: [
                {
                    model: User,
                    attributes: ["userId","userName", "userEmail"]

                },

                {
                    model: Category,
                    attributes: ["categoryId" , "categoryName"]
                }
            ]
        })

        if(!foodItems){
            res.status(400).json({
                success: false,
                message: "no food items found in database"
            });
            return
        }

        res.status(200).json({
            success: true,
            message: "Food items fetched successfully",
            data: foodItems
        })
    }

    async getSingleFoodItem(req, res){
        const {id} = req.params
    

        const singleFoodItem = await Food.findAll({where:{
           foodId : id
        },
        include: [
            {
                model: User,
                attributes: ["userId", "userName", "userEmail"]
            },
            {
                model: Category,
                attributes: ["categoryId", "categoryName"]
            }
        ]
    },
)

        if(singleFoodItem.length === 0){
            res.status(404).json({
                success: false,
                message: "No food item with that id"
            });
            return
        }

        res.status(200).json({
            success: true,
            message: "Single food item fetched succesfully",
            data: singleFoodItem
        });
        return
    }

    async deleteFoodItem(req, res){
        const {id} = req.params;
        const foodItem = await Food.findOne({where: {foodId: id}});

        if(!foodItem){
            res.status(404).json({
                success: false,
                message: "No food item with that id"
            })
            return;
        }
        if(foodItem.image){
            await unlinkAsync(foodItem.image).catch((err)=>{
                console.log("failed to delete image:", err);
            });
        }

        await Food.destroy({where: {
            foodId: id
        }});
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully"
        })

    }

    async updateFoodItem(req, res){
        const {id} = req.params;
        const{foodName, foodDescription, foodPrice, categoryId} = req.body;

        const image = req.file;

        const foodItem = await Food.findOne({where: {foodId: id}})

        if(!foodItem){
            res.status(404).json({
                success: false,
                message: "No blog with that id"
            });
            return;
        }
        
        if(image){
            rm(foodItem.image, ()=>{
                console.log("old image deleted")
            });
            foodItem.image = image.path;
        }
        if(foodName) foodItem.foodName = foodName;
        if(foodDescription) foodItem.foodDescription = foodDescription;
        if(foodPrice) foodItem.foodPrice = foodPrice;
        if(categoryId) foodItem.categoryId = categoryId;
    
        await foodItem.save();

        res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            data: foodItem

        })
    }
}

export default new FoodController();