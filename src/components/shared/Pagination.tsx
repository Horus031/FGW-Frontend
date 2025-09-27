import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Pagination = () => {
  const [isActive] = useState(1);

  return (
    <div className="flex items-center justify-center gap-8">
      <ChevronLeft className="cursor-pointer active:scale-90"/>

      <div className="flex gap-3 text-sm font-semibold">
        <span
          className={`cursor-pointer active:scale-90 ${
            isActive ? "bg-secondary text-white" : ""
          } px-4 py-2 rounded-md`}
        >
          1
        </span>
        <span className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md`}>2</span>
        <span className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md`}>3</span>
        <span className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md`}>4</span>
        <span className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md`}>5</span>
        <span className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md`}>6</span>
      </div>

      <ChevronRight className="cursor-pointer active:scale-90"/>
    </div>
  );
};

export default Pagination;
