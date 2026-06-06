import ProductList from '../components/Products/ProductList'

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Products</h2>
      <ProductList />
    </div>
  )
}
