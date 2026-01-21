// models/Account.js
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/database.config.js";
import { AccountRole, AccountStatus } from "../enums/user.enum.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(AccountStatus)),
      defaultValue: AccountStatus.ACTIVE,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(AccountRole)),
      defaultValue: AccountRole.CUSTOMER,
    },

    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
