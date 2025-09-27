const ProgressCircle = () => {
  return (
    <div>
      <div className="relative size-23">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={18}
            cy={18}
            r={16}
            fill="none"
            className="stroke-current text-gray-200 dark:text-neutral-700"
            strokeWidth={4}
          />
          <circle
            cx={18}
            cy={18}
            r={16}
            fill="none"
            className="stroke-current text-approve"
            strokeWidth={4}
            strokeDasharray={100}
            strokeDashoffset={75}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-sm font-medium text-gray-400">
            Absent <br /> 5%
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressCircle