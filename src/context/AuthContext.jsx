import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'ecommerce_auth'
const WISHLIST_KEY = 'ecommerce_wishlist'

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false }
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } }
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.find((item) => item.id === action.payload.id)
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      }
    }
    default:
      return state
  }
}

function getInitialState() {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    const wishlistStored = localStorage.getItem(WISHLIST_KEY)
    const wishlist = wishlistStored ? JSON.parse(wishlistStored) : []
    if (stored) {
      const user = JSON.parse(stored)
      return { user, isAuthenticated: true, wishlist }
    }
    return { user: null, isAuthenticated: false, wishlist }
  } catch {
    return { user: null, isAuthenticated: false, wishlist: [] }
  }
}

/* eslint-disable react-refresh/only-export-components */

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState)

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(state.user))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }, [state.isAuthenticated, state.user])

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist))
  }, [state.wishlist])

  const login = useCallback((email, password) => {
    if (!email || !password) return false
    const name = email.split('@')[0]
    const now = new Date()
    dispatch({
      type: 'LOGIN',
      payload: {
        email,
        name,
        phone: '',
        address: '',
        joinDate: now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    })
    return true
  }, [])

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [])
  const updateProfile = useCallback(
    (data) => dispatch({ type: 'UPDATE_PROFILE', payload: data }),
    []
  )
  const toggleWishlist = useCallback(
    (product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product }),
    []
  )
  const isInWishlist = useCallback(
    (productId) => state.wishlist.some((item) => item.id === productId),
    [state.wishlist]
  )

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        wishlist: state.wishlist,
        login,
        logout,
        updateProfile,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
