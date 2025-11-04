const SlotButton = ({ label, isSelected, onClick }: SlotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-0 py-0 rounded-lg cursor-pointer overflow-hidden relative
                 transition-all duration-200"
    >
      <div
        className={`px-6 py-4 w-full h-full rounded-lg font-medium border-2 transition-transform duration-150 
                    ${isSelected
            ? "bg-secondary text-white border-secondary hover:opacity-70"
            : "bg-white text-secondary border-secondary hover:bg-[#EBF4FF] hover:text-secondary"
          } 
                    active:scale-90`}
      >
        {label}
      </div>
    </button>
  );
};

interface SlotButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default SlotButton;
