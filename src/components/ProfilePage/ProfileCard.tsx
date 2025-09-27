import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CourseCard from "../CourseCard";



const ProfileCard = () => {

  return (
    <div className="flex flex-col gap-18 w-9/12">
      <div className="flex flex-col gap-8 w-9/12">
        <div className="flex items-center gap-8">
          <Avatar className="size-20">
            <AvatarImage src="." />
            <AvatarFallback className="text-4xl bg-bright text-white">
              NV
            </AvatarFallback>
          </Avatar>

          <span className="text-[40px] font-bold text-primary">
            Vo Minh Nghia
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <Label htmlFor="studentId" className="mb-2">
              Student ID
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="studentId"
              value="GCS230351"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="email"
              value="nghiavmgcs230351@fpt.edu.vn"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="faculty" className="mb-2">
              Faculty
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="faculty"
              value="Computer Science"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="year" className="mb-2">
              Year
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="year"
              value="2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-1">
            <Label htmlFor="academic" className="mb-2">
              Academic
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="academic"
              value="Sep 2024 - Sep 2026"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="campus" className="mb-2">
              Campus
            </Label>
            <Input
              className="py-2.5 border-gray-400"
              disabled
              id="campus"
              value="Ho Chi Minh"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">Course</h2>

        <div className="grid grid-cols-3 gap-5">
          <CourseCard/>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
