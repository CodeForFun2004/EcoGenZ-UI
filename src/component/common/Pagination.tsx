import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = [];

  const safeTotalPages = Math.max(0, totalPages);

  for (let i = 1; i <= safeTotalPages; i++) {
    pageNumbers.push(i);
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < safeTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination-container">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="pagination-button pagination-prev-next" // <--- THÊM CLASS MỚI
      >
        &laquo; Prev
      </button>
      <div className="page-numbers-group">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-button ${
              number === currentPage ? "active" : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={goToNext}
        disabled={currentPage === safeTotalPages}
        className=" pagination-button pagination-prev-next"
      >
        Next &raquo;
      </button>
    </nav>
  );
}

export default Pagination;
