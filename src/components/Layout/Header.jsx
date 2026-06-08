import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import ProfileMenu from '../Dashboard/ProfileMenu'

const Header = memo(function Header() {
  const { isAuthenticated } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          Nova Cart
        </Link>

        {isAuthenticated && (
          <>
            <nav className="header-nav">
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Cart
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </NavLink>
            </nav>

            <ProfileMenu />
          </>
        )}
      </div>
    </header>
  )
})

export default Header
