import { memo } from 'react'
import { useAuth } from '../../context/AuthContext'

const Header = memo(function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo">Nova Cart</h1>
        <nav className="header-nav">
          {user && (
            <>
              <span className="user-greeting">Hi, {user.name}</span>
              <button onClick={logout} className="btn-logout">
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
})

export default Header
