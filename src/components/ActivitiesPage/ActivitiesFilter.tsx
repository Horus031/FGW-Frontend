import DatePicker from "../shared/DatePicker";
import InputWithIcon from "../shared/InputWithIcon";

const ActivitiesFilter = () => {
  return (
    <div className="w-fit flex items-center gap-2">
      <InputWithIcon placeholder="Search Lecturer by Staff Code..."/>

      <DatePicker />
    </div>
  );
};

export default ActivitiesFilter;
