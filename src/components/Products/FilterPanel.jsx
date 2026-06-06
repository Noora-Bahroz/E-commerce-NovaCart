import { memo } from 'react'

const FilterPanel = memo(function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="filter-panel">
      <label htmlFor="category-filter" className="sr-only">
        Filter by category
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
})

export default FilterPanel
