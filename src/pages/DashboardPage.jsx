import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EmptyState from '../components/common/EmptyState'

const TABS = [
  { id: 'profile', label: 'My Profile', icon: '👤' },
  { id: 'orders', label: 'Order History', icon: '📋' },
  { id: 'wishlist', label: 'Wishlist', icon: '♡' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2026-05-15', items: 3, total: 149.97, status: 'delivered' },
  { id: 'ORD-002', date: '2026-04-20', items: 1, total: 89.99, status: 'delivered' },
  { id: 'ORD-003', date: '2026-03-05', items: 5, total: 299.50, status: 'shipped' },
  { id: 'ORD-004', date: '2026-02-10', items: 2, total: 79.98, status: 'processing' },
  { id: 'ORD-005', date: '2026-01-22', items: 4, total: 199.80, status: 'pending' },
]

const STATUS_MAP = {
  delivered: { label: 'Delivered', className: 'status-delivered' },
  shipped: { label: 'Shipped', className: 'status-shipped' },
  processing: { label: 'Processing', className: 'status-processing' },
  pending: { label: 'Pending', className: 'status-pending' },
}

export default function DashboardPage() {
  const { user, logout, wishlist, toggleWishlist, updateProfile } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(
    TABS.some((t) => t.id === tabFromUrl) ? tabFromUrl : 'profile'
  )

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [saved, setSaved] = useState(false)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchParams(tabId === 'profile' ? {} : { tab: tabId })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile(editForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initial = user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-user">
          <span className="sidebar-avatar">{initial}</span>
          <div>
            <p className="sidebar-name">{user?.name}</p>
            <p className="sidebar-email">{user?.email}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={logout}>
          Sign Out
        </button>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'profile' && (
          <section className="dash-section">
            <h2 className="dash-section-title">My Profile</h2>
            <div className="profile-hero">
              <span className="profile-hero-avatar">{initial}</span>
              <div>
                <h3>{user?.name}</h3>
                <p className="text-muted">{user?.email}</p>
                <p className="text-muted">Member since {user?.joinDate}</p>
              </div>
            </div>
            <div className="info-grid">
              <div className="info-card">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-card">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-card">
                <label>Phone</label>
                <p>{user?.phone || 'Not set'}</p>
              </div>
              <div className="info-card">
                <label>Address</label>
                <p>{user?.address || 'Not set'}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'orders' && (
          <section className="dash-section">
            <h2 className="dash-section-title">Order History</h2>
            <div className="orders-list">
              {MOCK_ORDERS.map((order) => {
                const status = STATUS_MAP[order.status] || STATUS_MAP.pending
                return (
                  <div key={order.id} className="order-card">
                    <div className="order-top">
                      <span className="order-id">Order #{order.id}</span>
                      <span className={`order-badge ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="order-details">
                      <span>Placed on {order.date}</span>
                      <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                      <span className="order-total">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {activeTab === 'wishlist' && (
          <section className="dash-section">
            <h2 className="dash-section-title">Wishlist</h2>
            {wishlist.length === 0 ? (
              <EmptyState message="Your wishlist is empty. Browse products and add items you like." />
            ) : (
              <div className="wishlist-grid">
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-card">
                    <div className="wishlist-img">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="wishlist-body">
                      <p className="wishlist-title">{product.title}</p>
                      <p className="wishlist-price">${product.price.toFixed(2)}</p>
                      <button
                        className="btn-remove-wishlist"
                        onClick={() => toggleWishlist(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="dash-section">
            <h2 className="dash-section-title">Account Settings</h2>
            <form className="settings-form" onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label htmlFor="edit-name">Full Name</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-phone">Phone Number</label>
                <input
                  id="edit-phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-address">Address</label>
                <textarea
                  id="edit-address"
                  value={editForm.address}
                  onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
              <div className="settings-actions">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                {saved && <span className="save-success">Profile updated!</span>}
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}
