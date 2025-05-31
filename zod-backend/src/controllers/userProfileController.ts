import { MulterRequest } from "@middleware/imageHandler";
import UserProfileModel from "@model/ProfileModel";
import { Request, Response } from "express";

export const createUserProfile = async (req: Request, res: Response) => {
  const file = (req as MulterRequest).file;
  console.log("file before validation:>> ", file);
  if (file) {
    req.body.profilePicture = `http://localhost:4000/img/${file.filename}`;
  }

  console.log("req.body :>> ", req.body);
  try {
    const createProfile = await UserProfileModel.upsert(req.body);
    console.log("createProfile :>> ", createProfile);
    res.status(400).json(createProfile);
  } catch (error: any) {
    console.log("error :>> ", error);
    if (error) {
      console.log("hay error");
      throw new Error("BROKEN");
    }
  }
};

export const getUserProfiles = async (req: Request, res: Response) => {
  try {
    const userProfiles = await UserProfileModel.findAll();
    // Parse hoobies JSON string back to array
    const parsedProfiles = userProfiles.map(profile => ({
      ...profile.get()
    }));
    res.status(200).json(parsedProfiles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
};
