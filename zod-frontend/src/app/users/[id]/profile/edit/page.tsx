import ProfileForm from "@/app/components/ProfileForm";
import { FC } from "react";

const UserProfile: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const urlParams = await params;
  const id = urlParams.id;

  return <ProfileForm id={id} />;
};

export default UserProfile;
