import { DataTypes } from "sequelize";
import sequelize from "../database/dbconnection.js";

const Category = sequelize.define("Category", {
    categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,

    },

    categoryName: {
        type: DataTypes.STRING,
        required: [true, "category name must be provided"],
    }
}, {
    timestamps: true
})

export default Category;