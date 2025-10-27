import SummaryPicker from "../TeachingSummaryPage/SummaryPicker";

type MajorSelectCardProps = {
  data: {
    selectName: string;
    selectOptions: string[];
  }[];
  isSummary?: boolean;
};

const MajorSelectCard = (props: MajorSelectCardProps) => {
  const { data, isSummary } = props;
  const renderSelectOption = () => {
    return data.map((item, index) => {
      // If isSummary, not render the last button
      if (isSummary && index === item.selectOptions.length)
        return <div key={index} className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">
              From:
            </span>
          </div>
          <div className="flex items-center gap-2 w-fit font-semibold">
            <SummaryPicker/> to <SummaryPicker/>
          </div>
        </div>;
      return (
        <div key={item.selectName} className="flex items-center gap-8 py-2">
          <div className="text-right text-primary w-[80px]">
            <span className="text-sm font-medium w-fit">
              {item.selectName}:
            </span>
          </div>
          <div className="flex items-center gap-2 w-fit">
            {item.selectOptions.map((option, index) => {
              return (
                <button
                  className="text-gray-800 font-medium px-2 border-1 rounded-sm py-0.5 cursor-pointer active:scale-95"
                  key={index}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={`${
        !isSummary ? "basis-7/12" : "w-fit"
      } px-3 py-2 border-1 border-gray-400 whitespace-nowrap rounded-lg`}
    >
      <div className="pt-3 py-2">{renderSelectOption()}</div>
    </div>
  );
};

export default MajorSelectCard;
