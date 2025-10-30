import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
  type: 'text' | 'select' | 'number';
  options?: { label: string; value: string | number }[];
  placeholder?: string;
}

interface FilterValues {
  [key: string]: string | number | undefined;
}

interface FilterButtonProps<T extends FilterValues = FilterValues> {
  filters?: FilterOption[];
  onFilterChange?: (filters: T) => void;
  buttonText?: string;
  className?: string;
}

const FilterButton = <T extends FilterValues = FilterValues>({
  filters = [],
  onFilterChange,
  buttonText = "Filter",
  className = ""
}: FilterButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  const handleFilterChange = (key: string, value: string | number) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    const cleanedFilters = Object.entries(filterValues).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as FilterValues);

    onFilterChange?.(cleanedFilters as T);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilterValues({});
    onFilterChange?.({} as T);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
      >
        <span className="text-sm font-semibold text-[var(--color-primary)]">{buttonText}</span>
        <svg
          className="w-4 h-4 text-[var(--color-primary)]"
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

      {isOpen && filters.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-3">Filters</h3>

            {filters.map((filter) => (
              <div key={filter.value} className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>

                {filter.type === 'select' && filter.options ? (
                  <select
                    value={filterValues[filter.value] || ''}
                    onChange={(e) => handleFilterChange(filter.value, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{filter.placeholder || 'Select...'}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'number' ? (
                  <input
                    type="number"
                    value={filterValues[filter.value] || ''}
                    onChange={(e) => handleFilterChange(filter.value, Number(e.target.value))}
                    placeholder={filter.placeholder || ''}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={filterValues[filter.value] || ''}
                    onChange={(e) => handleFilterChange(filter.value, e.target.value)}
                    placeholder={filter.placeholder || ''}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterButton;
