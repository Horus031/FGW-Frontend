// import ProgressCircle from "@/components/ProgressCircle";
import ProfileCard from "@/components/ProfilePage/ProfileCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, User } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-sm flex gap-1 items-center text-primary">
                  <Home size={16} /> Home
                </span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-sm flex gap-1 items-center text-secondary">
                  <User size={16} /> Profile
                </span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className="text-3xl text-primary font-semibold">User detail</h2>
        </div>
      </div>

      <ProfileCard/>
    </div>
  );
};

export default ProfilePage;
