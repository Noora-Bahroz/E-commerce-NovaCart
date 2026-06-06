import { memo } from 'react'

const SortSelect = memo(function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-by" className="sr-only">Sort by</label>
      <select id="sort-by" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  )
})

export default SortSelect
