import { FC } from "react";
import ProfileView from "@/app/components/ProfileView";
import { fetchUsersById } from "@/app/helpers/api";

const ProfileViewPage: FC<{ params: Promise<{ id: string }> }> = async props => {
  const urlParams = await props.params;
  const id = urlParams.id;

  const user = await fetchUsersById(id);

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileView user={user} />
    </div>
  );
};

export default ProfileViewPage;
