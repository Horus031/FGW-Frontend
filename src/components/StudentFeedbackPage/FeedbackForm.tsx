import { FEEDBACK_QUESTIONS } from "../../constants/constants";

const FeedbackForm = () => {
  const renderQuestions = () => {
    return (
      <ol className="grid grid-cols-2 list-decimal space-y-5">
        {FEEDBACK_QUESTIONS.map((question, index) => (
          <li key={index} className="flex flex-col gap-4 pb-6.5 border-b-1 last:border-b-0 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">
                {index + 1}. {question.title}
              </span>
              <span>({question.subtitle})</span>
            </div>

            {question.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  className="size-5"
                  type="radio"
                  name={question.title}
                  id={option.label}
                />
                <label className="text-primary font-medium">
                  {option.label}{" "}
                  <span className="font-normal">({option.trans})</span>
                </label>
              </div>
            ))}
          </li>
        ))}
      </ol>
    );
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="px-5 py-6 border border-gray-300 rounded-lg col-span-2">
          {renderQuestions()}
        </div>

        <div className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col">
            <span className="font-semibold">
              Remarks - Suggestions for improvement
            </span>
            <span>(Ghi chú - đề nghị cải tiến)</span>
          </div>

          <textarea
            name="remarks"
            id=""
            className="w-1/2 h-40 border border-gray-300 rounded-lg p-2 text-base focus:outline-0"
          ></textarea>
          <button className="w-fit bg-secondary px-6 py-3 text-white font-semibold rounded-lg cursor-pointer hover:bg-secondary/90 active:scale-90">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
