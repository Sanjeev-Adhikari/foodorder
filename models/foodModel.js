import { DataTypes } from "sequelize";
import sequelize from "../database/dbconnection.js";

const Food = sequelize.define('Food', {
    foodId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    foodName: {
        type: DataTypes.STRING,
        required: [true, "A name must be provided to the Food Item"],
        allowNull: false
    },

    foodDescription: {
        type: DataTypes.STRING,
        required: [true, "A description must be provided for the food"],
        allowNull: false,
    },

    foodPrice: {
        type: DataTypes.DECIMAL(10, 2),
        required: [true, "a price must be set to a food item"],
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        required: [true, "a food item must have its unique image for identification"],
        allowNull: false
    },

}, {
    timestamps: true,
})

export default Food;