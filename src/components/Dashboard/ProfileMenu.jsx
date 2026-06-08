import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const initial = user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <div className="profile-menu" ref={menuRef}>
      <button className="profile-trigger" onClick={() => setOpen((p) => !p)}>
        <span className="profile-avatar">{initial}</span>
        <span className="profile-name">{user?.name}</span>
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <span className="dropdown-avatar">{initial}</span>
            <div>
              <p className="dropdown-name">{user?.name}</p>
              <p className="dropdown-email">{user?.email}</p>
            </div>
          </div>
          <div className="dropdown-divider" />
          <Link to="/dashboard" className="dropdown-item" onClick={() => setOpen(false)}>
            My Dashboard
          </Link>
          <Link to="/dashboard?tab=settings" className="dropdown-item" onClick={() => setOpen(false)}>
            Settings
          </Link>
          <div className="dropdown-divider" />
          <button className="dropdown-item dropdown-logout" onClick={logout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
