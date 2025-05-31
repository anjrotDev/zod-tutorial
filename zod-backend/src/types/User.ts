export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface UserProfile {
  userID: number;
  userName: string;
  age: number;
  address: string;
  city: string;
  country: string;
  phone: number;
  birthday: Date;
  hoobies: string[];
  about: string;
  profilePicture: string;
  theme: "light" | "dark";
}
