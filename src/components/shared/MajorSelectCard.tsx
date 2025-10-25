type MajorSelectCardProps = {
  data: {
    selectName: string;
    selectOptions: string[];
  }[];
};

const MajorSelectCard = (props: MajorSelectCardProps) => {
  const { data } = props;
  const renderSelectOption = () => {
    return data.map((item) => {
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
    <div className="basis-7/12 px-3 py-2 border-1 border-gray-400 rounded- whitespace-nowrap rounded-lg">
      <div className="pt-3 py-2">{renderSelectOption()}</div>
    </div>
  );
};

export default MajorSelectCard;
