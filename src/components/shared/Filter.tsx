const FilterButton = () => {
  return (
    <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
      <span className="text-sm font-medium text-gray-700">Filter</span>
      <svg
        className="w-4 h-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 6h14M7 12h10M9 18h6"
        />
        </svg>
    </button>
  );
};

export default FilterButton;