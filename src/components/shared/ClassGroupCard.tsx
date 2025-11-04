import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { ClassGroup, ClassState } from "../../models/class";

type ClassGroupProps = {
  data: ClassGroup[] | undefined;
  selectedClass: ClassState;
  setSelectedClass: Dispatch<SetStateAction<ClassState>>;
};

const ClassGroupCard = (props: ClassGroupProps) => {
  const { data, selectedClass, setSelectedClass } = props;

  // Initial first valu of first class is selected
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedClass((prev) => {
        return {
          ...prev,
          index: 0,
          id: data[0].id,
          name: data[0].name,
        };
      });
    }
  }, [data, setSelectedClass]);

  const handleSelectClass = (classId: string, index: number, name: string) => {
    setSelectedClass((prev) => {
      return {
        ...prev,
        index: index,
        id: classId,
        name: name,
      };
    });
  };

  const renderClassGroup = () => {
    return data?.map((item, index) => {
      return (
        <button
          onClick={() => handleSelectClass(item.id, index, item.name)}
          key={item.id}
          className={`${
            selectedClass.index === index ? "text-secondary" : "text-gray-800"
          } font-medium justify-self-start cursor-pointer active:scale-95 h-fit`}
        >
          {item.name}
        </button>
      );
    });
  };
  return (
    <div className="border-1 border-gray-400 p-6 rounded-lg flex-1 h-55.5">
      <div className="grid text-left grid-cols-4 gap-x-3 gap-y-2 h-full">
        {renderClassGroup()}
      </div>
    </div>
  );
};

export default ClassGroupCard;
