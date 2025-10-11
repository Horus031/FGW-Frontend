const SlotButton = ({ label, isSelected, onClick }: SlotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-lg border-2 font-medium transition-all duration-200 cursor-pointer ${isSelected
        ? "bg-secondary text-white border-secondary hover:opacity-70"
        : "bg-white text-secondary border-secondary hover:bg-secondary hover:text-white"
        }`}
    >
      {label}
    </button>
  );
};


interface SlotButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default SlotButton;
