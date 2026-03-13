import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './Concessions.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const categories = ['All', 'Food', 'Drinks', 'Merchandise']

const Concessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(null)

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Burger', category: 'Food', price: 2500, description: 'Juicy beef burger with fries' },
    { id: 2, name: 'Pizza Slice', category: 'Food', price: 1800, description: 'Cheesy pepperoni pizza' },
    { id: 3, name: 'Hot Dog', category: 'Food', price: 1200, description: 'Classic hot dog with mustard' },
    { id: 4, name: 'Popcorn', category: 'Food', price: 800, description: 'Freshly popped buttered popcorn' },
    { id: 5, name: 'Fanta', category: 'Drinks', price: 500, description: 'Ice cold 50cl bottle' },
    { id: 6, name: 'Coke', category: 'Drinks', price: 500, description: 'Ice cold 50cl bottle' },
    { id: 7, name: 'Water', category: 'Drinks', price: 300, description: 'Pure chilled water' },
    { id: 8, name: 'Juice', category: 'Drinks', price: 800, description: 'Fresh chilled juice' },
    { id: 9, name: 'Jersey', category: 'Merchandise', price: 5000, description: 'Official event jersey' },
    { id: 10, name: 'Cap', category: 'Merchandise', price: 2000, description: 'Branded event cap' },
  ])

  const { token } = useAuth()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/shop/products`,
          {
            headers: {
              'id': token
            }
          }
        )
        const data = await response.json()
        if (Array.isArray(data)) {
          setMenuItems(data.map(item => ({
            id: item._id,
            name: item.name,
            category: item.category || 'Food',
            price: item.price,
            description: item.description,
            stock: item.stock
          })))
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error)
      }
    }
    if (token) fetchMenu()
  }, [token])

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const decreaseQty = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (existing.qty === 1) {
        return prev.filter(i => i.id !== itemId)
      }
      return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const addFreeItem = (item) => {
    setCart(prev => [...prev, { ...item, qty: 1, price: 0, redeemed: true }])
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const grandTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0)

  const getItemQty = (itemId) => {
    const item = cart.find(i => i.id === itemId)
    return item ? item.qty : 0
  }

  return (
    <div className="concessions-page">

      {/* Header */}
      <div className="concessions-header">
        <button
        onClick={() => setShowCart(!showCart)}
        className={`cart-btn ${showCart ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
       <button className="heart-btn" title="Favourites">
          <FontAwesomeIcon icon={faHeart} />
       </button>
      </div>

      {/* Title Card */}
      <div className="concessions-title-card">
        <h1>Concessions</h1>
        <p>Add Extras to Your Event and Enhance Your Experience</p>
      </div>

      {/* Category Filter */}
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Body — splits into 2 panels on desktop */}
      <div className="concessions-body">

        {/* LEFT — Menu Section */}
        <div className="menu-section">
          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-card-footer">
                  <span className="item-price">₦{item.price.toLocaleString()}</span>
                  {getItemQty(item.id) > 0 ? (
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                      <span className="qty-number">{getItemQty(item.id)}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => addToCart(item)}>+ Add</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Side Panel (cart, checkout, confirmation) */}
        <div className="side-panel">

          {/* Cart Panel */}
          {showCart && checkoutStep === null && (
            <div className="cart-panel">
              <h2>🛒 Your Cart</h2>
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty. Add some items!</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        {item.redeemed && <span className="free-badge">FREE</span>}
                        <div className="cart-item-price">
                          ₦{item.price.toLocaleString()} × {item.qty} = ₦{(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>❌</button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">₦{grandTotal.toLocaleString()}</span>
                  </div>
                  <button
                    className="checkout-btn"
                    onClick={() => { setCheckoutStep('checkout'); setShowCart(false) }}
                  >
                    Proceed to Checkout →
                  </button>
                </>
              )}
            </div>
          )}

          {/* Checkout Screen */}
          {checkoutStep === 'checkout' && (
            <div className="checkout-screen">
              <h2>🧾 Checkout</h2>
              <h3>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="order-summary-item">
                  <span>{item.name} × {item.qty}</span>
                  <span>{item.redeemed ? 'FREE' : `₦${(item.price * item.qty).toLocaleString()}`}</span>
                </div>
              ))}
              <div className="order-summary-total">
                <span>Total:</span>
                <span className="total-amount">₦{grandTotal.toLocaleString()}</span>
              </div>

              <div className="pickup-details">
                <h3>📍 Pickup Details</h3>
                <p>📌 <strong>Location:</strong> Concessions Stand C — Gate 5</p>
                <p>⏱ <strong>Estimated Time:</strong> 10-15 minutes after confirmation</p>
                <p>🎟 <strong>Show your QR code</strong> at the stand to collect your order</p>
              </div>
              <div className="checkout-actions">
                <button className="back-btn" onClick={() => { setCheckoutStep(null); setShowCart(true) }}>← Back to Cart</button>
                <button className="confirm-btn" onClick={() => setCheckoutStep('confirmation')}>Confirm Order ✓</button>
              </div>
            </div>
          )}

          {/* Order Confirmation Screen */}
          {checkoutStep === 'confirmation' && (
            <div className="confirmation-screen">
              <div className="confirmation-icon">🎉</div>
              <h2>Order Confirmed!</h2>
              <p>Your order has been placed successfully</p>

              <div className="order-receipt">
                <h3>🧾 Order Receipt</h3>
                {cart.map(item => (
                  <div key={item.id} className="receipt-item">
                    <span>{item.name} × {item.qty}</span>
                    <span>{item.redeemed ? 'FREE' : `₦${(item.price * item.qty).toLocaleString()}`}</span>
                  </div>
                ))}
                <div className="receipt-total">
                  <span>Total Paid:</span>
                  <span className="total-amount">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="collect-info">
                <h3>📍 Collect Your Order</h3>
                <p>📌 <strong>Location:</strong> Concessions Stand C — Gate 5</p>
                <p>⏱ <strong>Ready in:</strong> 10-15 minutes</p>
                <p>🎟 <strong>Show your QR code</strong> at the stand</p>
              </div>

              <button
                className="new-order-btn"
                onClick={() => { setCheckoutStep(null); setCart([]); setShowCart(false) }}
              >
                🛍 Place Another Order
              </button>
            </div>
          )}

        </div>
        {/* closes side-panel */}

      </div>
      {/* closes concessions-body */}

    </div>
  )
}

export default Concessions