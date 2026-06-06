import { memo } from 'react'

const ProductCard = memo(function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-category">{product.category}</p>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <div className="product-card-rating">
          {'★'.repeat(Math.round(product.rating?.rate || 0))}
          {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
          <span>({product.rating?.count || 0})</span>
        </div>
      </div>
    </article>
  )
})

export default ProductCard
