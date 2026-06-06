import { useEffect, useCallback } from 'react'
import { useProducts } from '../../context/ProductContext'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'
import SortSelect from './SortSelect'
import Pagination from './Pagination'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import EmptyState from '../common/EmptyState'

export default function ProductList() {
  const {
    products,
    categories,
    loading,
    error,
    search,
    category,
    sortBy,
    page,
    totalPages,
    paginatedProducts,
    fetchProducts,
    fetchCategories,
    setSearch,
    setCategory,
    setSortBy,
    setPage,
  } = useProducts()

  useEffect(() => {
    if (products.length === 0) fetchProducts()
    if (categories.length === 0) fetchCategories()
  }, [products.length, categories.length, fetchProducts, fetchCategories])

  const handleSearchChange = useCallback(
    (value) => setSearch(value),
    [setSearch]
  )

  const handleCategoryChange = useCallback(
    (value) => setCategory(value),
    [setCategory]
  )

  const handleSortChange = useCallback(
    (value) => setSortBy(value),
    [setSortBy]
  )

  const handlePageChange = useCallback(
    (value) => setPage(value),
    [setPage]
  )

  return (
    <section className="product-list-section">
      <div className="controls-bar">
        <SearchBar value={search} onChange={handleSearchChange} />
        <FilterPanel
          categories={categories}
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        <SortSelect value={sortBy} onChange={handleSortChange} />
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} onRetry={fetchProducts} />}

      {!loading && !error && paginatedProducts.length === 0 && (
        <EmptyState />
      )}

      {!loading && !error && paginatedProducts.length > 0 && (
        <>
          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="pagination-wrapper">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  )
}
