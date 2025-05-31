import { Request, Response } from "express";
import UserModel from "@model/UserModel";
import UserProfileModel from "@model/ProfileModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id, {
      include: [
        {
          model: UserProfileModel,
          as: "profile",
          required: false
        }
      ]
    });
    if (user) {
      const pro: UserProfileModel = user.get("profile") as UserProfileModel;
      pro.hoobies = pro.hoobies.toString().split(",");
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await UserModel.findByPk(id);
    console.log("user :>> ", user);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
