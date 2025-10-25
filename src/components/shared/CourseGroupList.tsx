type CourseGroupProps = {
  data: {
    className: string;
    courseGroup: {
      courseCode: string;
      courseName: string;
    }[];
  };
};

const CourseGroupList = (props: CourseGroupProps) => {
  const { data } = props;

  const renderCourseGroup = () => {
    return data.courseGroup.map((item) => {
        return (
            <div key={item.courseCode} className="px-4 py-3 rounded-lg text-xs flex flex-col gap-4 border-1 border-gray-400 cursor-pointer active:scale-95">
                <span className="font-semibold">{item.courseCode}</span>
                <span>{item.courseName}</span>
            </div>
        )
    })
  };

  return (
    <div className="p-4 border-1 border-gray-400 flex flex-col gap-4 text-primary rounded-lg lg:basis-3/12 2xl:basis-4/12">
        <span className="font-semibold text-sm">{data.className}</span>
        {renderCourseGroup()}
    </div>
  );
};

export default CourseGroupList;
