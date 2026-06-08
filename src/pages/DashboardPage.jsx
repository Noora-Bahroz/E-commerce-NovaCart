import DashboardStats from '../components/Dashboard/DashboardStats'
import ProductList from '../components/Products/ProductList'

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-subtitle">Overview of your product catalog</p>
      </div>
      <DashboardStats />
      <section className="dashboard-products">
        <h3 className="section-title">All Products</h3>
        <ProductList />
      </section>
    </div>
  )
}
