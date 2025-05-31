interface UserProfile {
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

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  profile?: UserProfile;
}

const createUser = (user: User): User => user;

const user: any = {
  name: "AnjrotDev",
  email: "cualquiercosa",
  password: 123456,
  profile: {
    userID: "1",
    userName: "Anjrot",
    age: "42",
    address: "My Address",
    city: "Minnesota",
    country: "US",
    phone: "3056565465",
    birthday: "10/10/1979",
    about: "I'm a Software Developer",
    hoobies: `"Programming", "Play Video Games", "Go to restaurants"`,
    theme: "blue"
  }
};

console.log(createUser(user));
