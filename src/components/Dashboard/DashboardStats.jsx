import { useMemo } from 'react'
import { useProducts } from '../../context/ProductContext'

const STAT_CARDS = [
  { key: 'totalProducts', label: 'Total Products', icon: '📦' },
  { key: 'categories', label: 'Categories', icon: '📁' },
  { key: 'avgPrice', label: 'Avg. Price', icon: '💰', prefix: '$' },
  { key: 'totalReviews', label: 'Total Reviews', icon: '⭐' },
  { key: 'avgRating', label: 'Avg. Rating', icon: '🏆' },
]

export default function DashboardStats() {
  const { products, loading } = useProducts()

  const stats = useMemo(() => {
    if (products.length === 0) return null

    const categories = new Set(products.map((p) => p.category)).size
    const prices = products.map((p) => p.price)
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
    const totalReviews = products.reduce(
      (sum, p) => sum + (p.rating?.count || 0),
      0
    )
    const ratings = products
      .map((p) => p.rating?.rate)
      .filter(Boolean)
    const avgRating =
      ratings.reduce((a, b) => a + b, 0) / ratings.length

    return {
      totalProducts: products.length,
      categories,
      avgPrice: avgPrice.toFixed(2),
      totalReviews: totalReviews.toLocaleString(),
      avgRating: avgRating.toFixed(1),
    }
  }, [products])

  if (loading || !stats) return null

  return (
    <div className="dashboard-stats">
      {STAT_CARDS.map((card) => (
        <article key={card.key} className="stat-card">
          <span className="stat-icon">{card.icon}</span>
          <div className="stat-body">
            <span className="stat-value">
              {card.prefix || ''}{stats[card.key]}
            </span>
            <span className="stat-label">{card.label}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
