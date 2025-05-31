"use server";

import { revalidatePath } from "next/cache";
import { State, UserProfile, UserState } from "../types/types";
import { redirect } from "next/navigation";

export const createUser = async (previousState: UserState, formData: FormData) => {
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  };

  try {
    const userCreate = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const result = await userCreate.json();
    return result;
  } catch (error) {
    console.log("error :>> ", error);
    return {
      errorMessage: "Error creating user"
    };
  }
};

export const deleteUser = async (formData: FormData) => {
  const id = formData.get("userId");
  try {
    await fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    revalidatePath("/users");
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const createUserProfile = async (prevState: State, formData: FormData) => {
  const id = formData.get("userID");
  try {
    await fetch("http://localhost:4000/user-profiles", {
      method: "POST",
      body: formData
    });
  } catch (error) {
    console.log("error :>> ", error);
    return {
      message: "error creating profile"
    };
  }
  revalidatePath(`/users/${id}/profile/view`);
  redirect("/users");
};
