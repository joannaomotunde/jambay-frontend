import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Concessions.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const categories = ['All', 'Food', 'Drinks', 'Merchandise']

const Concessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  // Hard-coded menu items
  const [menuItems] = useState([
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

  // Filtered items by category
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  // Cart handlers
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
      if (!existing) return prev
      if (existing.qty === 1) return prev.filter(i => i.id !== itemId)
      return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const grandTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0)

  const getItemQty = (itemId) => {
    const item = cart.find(i => i.id === itemId)
    return item ? item.qty : 0
  }

  // Navigate to Payment Auth
  const proceedToCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/payment-auth') // Make sure this route exists
  }

  return (
    <div className="concessions-page">

      {/* Header */}
      <div className="concessions-header">
        <button
          onClick={() => setShowCart(!showCart)}
          className={`cart-btn ${showCart ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faCartShopping} /> {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
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

      {/* Body — Menu and Side Panel */}
      <div className="concessions-body">

        {/* Menu Section */}
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

        {/* Side Panel — Cart */}
        {showCart && (
          <div className="side-panel">
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
                  <button className="checkout-btn" onClick={proceedToCheckout}>
                    Proceed to Checkout →
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Concessions