import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@controllers/userController";
import { createUserProfile, getUserProfiles } from "@controllers/userProfileController";
import { uploadFile } from "@middleware/imageHandler";
import { Router } from "express";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("Api Working!!!");
  });

  router.get("/users", getUsers);
  router.post("/users", createUser);
  router.get("/users/:id", getUserById);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);

  router.get("/user-profiles", getUserProfiles);
  router.post("/user-profiles", uploadFile.single("profilePicture"), createUserProfile);

  return router;
};
