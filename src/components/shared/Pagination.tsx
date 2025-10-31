import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({
  currentPage,
  totalPages = 6,
  onPageChange,
  maxVisiblePages = 6
}: PaginationProps) => {

  // Calculate the range of pages to display
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end for visible range
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-8">
      <ChevronLeft
        className={`cursor-pointer active:scale-90 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handlePrevious}
      />

      <div className="flex gap-3 text-sm font-semibold">
        {pageNumbers.map((page) => (
          <span
            key={page}
            onClick={() => handlePageClick(page)}
            className={`cursor-pointer active:scale-90 px-4 py-2 rounded-md transition-colors ${currentPage === page
                ? "bg-secondary text-white"
                : "hover:bg-gray-100"
              }`}
          >
            {page}
          </span>
        ))}
      </div>

      <ChevronRight
        className={`cursor-pointer active:scale-90 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleNext}
      />
    </div>
  );
};

export default Pagination;