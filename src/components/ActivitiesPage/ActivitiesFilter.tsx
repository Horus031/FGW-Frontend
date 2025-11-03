import DatePicker from "../shared/DatePicker";

type ActivitiesFilterProps = {
  selectedDate?: Date | undefined;
  setSelectedDate: (d?: Date) => void;
};

const ActivitiesFilter = ({ selectedDate, setSelectedDate }: ActivitiesFilterProps) => {
  return (
    <div className="w-fit flex items-center gap-2">

      <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
    </div>
  );
};

export default ActivitiesFilter;
