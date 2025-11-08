type ProgressCircleProps = {
  percent: number;
};

const ProgressCircle = (props: ProgressCircleProps) => {
  const { percent } = props;
  // radius must match the `r` attribute on the circles below
  const radius = 16;
  const normalizedPercent = Math.max(0, Math.min(percent, 100));
  const circumference = 2 * Math.PI * radius;
  // strokeDashoffset is how much of the circle is hidden. When percent === 100 => offset = 0 (full)
  // When percent === 0 => offset = circumference (empty)
  const strokeOffset = circumference - (normalizedPercent / 100) * circumference;

  // Helpful debug
  console.log(
    "ProgressCircle percent:",
    percent,
    "normalized:",
    normalizedPercent,
    "offset:",
    strokeOffset.toFixed(2)
  );
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
            r={radius}
            fill="none"
            className="stroke-current text-gray-200 dark:text-neutral-700"
            strokeWidth={4}
          />
          <circle
            cx={18}
            cy={18}
            r={radius}
            fill="none"
            className="stroke-current text-approve"
            strokeWidth={4}
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-sm font-medium text-primary">
            Absent <br /> {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
