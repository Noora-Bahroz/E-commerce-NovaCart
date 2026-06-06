import { memo } from 'react'

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    if (start > 1) pages.push(1)
    if (start > 2) pages.push('...')

    for (let i = start; i <= end; i++) pages.push(i)

    if (end < totalPages - 1) pages.push('...')
    if (end < totalPages) pages.push(totalPages)

    return pages
  }

  return (
    <nav className="pagination" aria-label="Product pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &laquo; Prev
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next &raquo;
      </button>
    </nav>
  )
})

export default Pagination
