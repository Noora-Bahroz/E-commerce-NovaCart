import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'ecommerce_auth'

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false }
    default:
      return state
  }
}

function getInitialState() {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      const user = JSON.parse(stored)
      return { user, isAuthenticated: true }
    }
  } catch { /* ignore */ }
  return { user: null, isAuthenticated: false }
}

/* eslint-disable react-refresh/only-export-components */

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState)

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(state.user))
    } else {
      localStorage.removeItem(AUTH_KEY)
    }
  }, [state.isAuthenticated, state.user])

  const login = (email, password) => {
    if (!email || !password) return false
    dispatch({ type: 'LOGIN', payload: { email, name: email.split('@')[0] } })
    return true
  }

  const logout = () => dispatch({ type: 'LOGOUT' })

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
