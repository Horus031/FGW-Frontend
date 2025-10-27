import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Select = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={selectRef} className="relative inline-block w-full text-sm">
      <button
        type="button"
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-primary font-medium cursor-pointer focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-transparent flex justify-between items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected || "Quick Mark"}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <ul className="absolute z-10 bg-white text-primary border border-gray-300 rounded-lg mt-1 shadow-lg whitespace-nowrap w-fit">
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
            onClick={() => {
              setSelected("Mark as all attended");
              setOpen(false);
            }}
          >
            Mark as all attended
            {selected === "Mark as all attended" && <Check />}
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
            onClick={() => {
              setSelected("Mark as all absent");
              setOpen(false);
            }}
          >
            Mark as all absent
            {selected === "Mark as all absent" && <Check />}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Select;
