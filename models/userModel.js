
import {DataTypes } from "sequelize";
import sequelize from "../database/dbconnection.js";

const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, 
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('customer', 'admin'),
        defaultValue: 'customer',
      },

    }, {
      timestamps: true,
    });

export default User;