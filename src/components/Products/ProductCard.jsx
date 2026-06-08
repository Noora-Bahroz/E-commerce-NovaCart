import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useAuth()
  const { addToCart } = useCart()
  const wishlisted = isInWishlist(product.id)

  return (
    <article className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          className={`wishlist-btn${wishlisted ? ' wishlisted' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '\u2665' : '\u2661'}
        </button>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <span className="product-card-category">{product.category}</span>
        <span className="product-card-price">${product.price.toFixed(2)}</span>
        <div className="product-card-rating">
          {'\u2605'.repeat(Math.round(product.rating?.rate || 0))}
          {'\u2606'.repeat(5 - Math.round(product.rating?.rate || 0))}
          <span>({product.rating?.count || 0})</span>
        </div>
        <button className="btn-add-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  )
}
