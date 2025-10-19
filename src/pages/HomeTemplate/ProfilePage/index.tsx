// import ProgressCircle from "@/components/ProgressCircle";

import PageTitle from "../../../components/shared/PageTitle";
import ProfileCard from "../../../components/ProfilePage/ProfileCard";


const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <PageTitle breadcrumb="Profile"/>

      <ProfileCard/>
    </div>
  );
};

export default ProfilePage;
