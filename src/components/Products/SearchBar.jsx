import { memo } from 'react'

const SearchBar = memo(function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search" className="sr-only">Search products</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by name or description..."
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  )
})

export default SearchBar
