import { useCart } from '../context/CartContext'
import EmptyState from '../components/common/EmptyState'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="page-title">Shopping Cart</h2>
        <EmptyState message="Your cart is empty. Start shopping!" />
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="page-title">
          Shopping Cart ({items.length} item{items.length > 1 ? 's' : ''})
        </h2>
        <button className="btn-clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="cart-item-info">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-qty">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                &minus;
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <p className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  )
}
