import { DataTypes, Model } from "sequelize";
import { UserProfile } from "../types/User";
import { sequelize } from "@config/db";

interface ProfileAttributes extends UserProfile {}

class UserProfileModel extends Model<UserProfile, ProfileAttributes> implements UserProfile {
  public userID!: number;
  public userName!: string;
  public age!: number;
  public address!: string;
  public city!: string;
  public country!: string;
  public phone!: number;
  public birthday!: Date;
  public hoobies!: string[];
  public about!: string;
  public profilePicture!: string;
  public theme!: "light" | "dark";
}

UserProfileModel.init(
  {
    userID: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.NUMBER
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.BIGINT
    },
    birthday: {
      type: DataTypes.DATE
    },
    hoobies: {
      type: DataTypes.JSON
    },
    about: {
      type: DataTypes.TEXT
    },
    profilePicture: {
      type: DataTypes.STRING
    },
    theme: {
      type: DataTypes.ENUM("light", "dark"),
      defaultValue: "light"
    }
  },
  {
    sequelize,
    tableName: "user_profiles"
  }
);

export default UserProfileModel;
