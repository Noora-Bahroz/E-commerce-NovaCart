import { createContext, useContext, useReducer, useCallback } from 'react'

const ProductContext = createContext(null)

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  search: '',
  category: '',
  sortBy: 'default',
  page: 1,
  itemsPerPage: 8,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload, page: 1 }
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, categories: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, page: 1 }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    default:
      return state
  }
}

/* eslint-disable react-refresh/only-export-components */

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProducts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const { fetchProducts } = await import('../services/api')
      const data = await fetchProducts()
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message })
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const { fetchCategories } = await import('../services/api')
      const data = await fetchCategories()
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data })
    } catch { /* categories are optional – fail silently */ }
  }, [])

  const setSearch = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH', payload: value })
  }, [])

  const setCategory = useCallback((value) => {
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }, [])

  const setSortBy = useCallback((value) => {
    dispatch({ type: 'SET_SORT', payload: value })
  }, [])

  const setPage = useCallback((value) => {
    dispatch({ type: 'SET_PAGE', payload: value })
  }, [])

  const filteredProducts = (() => {
    let result = [...state.products]

    if (state.search) {
      const q = state.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (state.category) {
      result = result.filter((p) => p.category === state.category)
    }

    switch (state.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    return result
  })()

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / state.itemsPerPage)
  )

  const paginatedProducts = filteredProducts.slice(
    (state.page - 1) * state.itemsPerPage,
    state.page * state.itemsPerPage
  )

  return (
    <ProductContext.Provider
      value={{
        ...state,
        filteredProducts,
        paginatedProducts,
        totalPages,
        fetchProducts,
        fetchCategories,
        setSearch,
        setCategory,
        setSortBy,
        setPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
