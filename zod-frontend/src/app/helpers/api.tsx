import { UserState } from "../types/types";

export const fetchUsers = async () => {
  try {
    const getUsers = await fetch("http://localhost:4000/users", { headers: { "Content-Type": "application/json" } });
    const result = (await getUsers.json()) as UserState[];
    return result;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const fetchUsersById = async (userId: string) => {
  try {
    const getUserById = await fetch(`http://localhost:4000/users/${userId}`, { headers: { "Content-Type": "application/json" } });
    const result = (await getUserById.json()) as UserState;
    return result;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
