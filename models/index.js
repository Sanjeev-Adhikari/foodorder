import sequelize from "../database/dbconnection.js";

import User from "./userModel.js";
import Food from "./foodModel.js"
import Category from "./categoryModel.js";

// Relationships

User.hasMany(Food, {foreignKey: "userId"})
Food.belongsTo(User, {foreignKey: "userId"})

Food.belongsTo( Category, {foreignKey: "categoryId"})
Category.hasOne(Food, {foreignKey: "categoryId"})
  
export { sequelize, User, Food };

