import { Button } from "../ui/button";

type ActivitiesSelectProps = {
  tab: number;
  setTab: (tab: number) => void;
};

const ActivitiesSelect = ({ tab, setTab }: ActivitiesSelectProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="border border-gray-300 w-fit rounded-md text-black">
        <Button
          onClick={() => setTab(2)}
          className={`rounded-r-none cursor-pointer text-sm font-semibold ${
            tab === 2
              ? "bg-primary text-white"
              : "bg-white text-[var(--color-gray-weak)]"
          }`}
        >
          Floor 2
        </Button>
        <Button
          onClick={() => setTab(3)}
          className={`rounded-l-none cursor-pointer text-sm font-semibold ${
            tab === 3
              ? "bg-primary text-white"
              : "bg-white text-[var(--color-gray-weak)]"
          }`}
        >
          Floor 3
        </Button>
      </div>
    </div>
  );
};

export default ActivitiesSelect;