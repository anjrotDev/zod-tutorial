import { User } from "../types/User";
import { sequelize } from "@config/db";
import { DataTypes, Model, Optional } from "sequelize";
import UserProfileModel from "./ProfileModel";

interface UserAtrributes extends Optional<User, "id"> {}

class UserModel extends Model<User, UserAtrributes> implements User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: "users"
  }
);

UserModel.hasOne(UserProfileModel, {
  foreignKey: "userID",
  as: "profile"
});
UserProfileModel.belongsTo(UserModel, {
  foreignKey: "userID",
  as: "user"
});

export default UserModel;
