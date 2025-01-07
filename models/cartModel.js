import { DataTypes } from "sequelize";
import sequelize from "../database/dbconnection";

const Cart =  sequelize.define("Cart", {
    cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        required: [true, "quantity must be specified"]
    }
}, {
    timestamps: true
})

export default Cart;