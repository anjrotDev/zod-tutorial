export interface TitleProps {
  title: string;
  subTitle?: string;
}

export interface UserState {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  profile?: UserProfile;
  errorMessage?: string;
}

export interface UserProfile {
  userID?: number;
  userName?: string;
  age?: number;
  address?: string;
  city?: string;
  country?: string;
  phone?: number;
  birthday?: Date;
  hoobies?: string[];
  about?: string;
  profilePicture?: string;
  theme?: "light" | "dark";
  errorMessage?: string | null;
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message: string | null;
};
