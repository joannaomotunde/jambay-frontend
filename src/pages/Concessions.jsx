import { useState } from 'react'

const menuItems = [
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
]

const categories = ['All', 'Food', 'Drinks', 'Merchandise']

const Concessions = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  // Add item or increase quantity
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  // Decrease quantity or remove if qty reaches 0
  const decreaseQty = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (existing.qty === 1) {
        return prev.filter(i => i.id !== itemId)
      }
      return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  // Remove item completely from cart
  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  // For Divine — adds a free item with ₦0 price
  const addFreeItem = (item) => {
    setCart(prev => [...prev, { ...item, qty: 1, price: 0, redeemed: true }])
  }

  // Cart calculations
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const grandTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0)

  const getItemQty = (itemId) => {
    const item = cart.find(i => i.id === itemId)
    return item ? item.qty : 0
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>🍔 Concessions</h1>
        <div
  onClick={() => setShowCart(!showCart)}
  style={{ 
    background: showCart ? '#d4891a' : '#f5a623', 
    padding: '8px 16px', 
    borderRadius: '20px', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    boxShadow: showCart ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
    transform: showCart ? 'scale(0.97)' : 'scale(1)',
    transition: 'all 0.2s ease'
  }}
>
  🛒 Cart ({cartCount})
</div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === cat ? '#f5a623' : '#eee',
              fontWeight: selectedCategory === cat ? 'bold' : 'normal'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '30px' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '16px', background: '#fff' }}>
            <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 8px' }}>{item.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#f5a623' }}>₦{item.price.toLocaleString()}</span>

              {/* Show quantity controls if item is in cart, otherwise show + Add */}
              {getItemQty(item.id) > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    style={{ background: '#f5a623', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                    {getItemQty(item.id)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    style={{ background: '#f5a623', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(item)}
                  style={{ background: '#f5a623', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Panel */}
      {showCart && (
        <div style={{ border: '2px solid #f5a623', borderRadius: '16px', padding: '20px', background: '#fffdf7' }}>
          <h2 style={{ marginTop: 0 }}>🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center' }}>Your cart is empty. Add some items!</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                  <div>
                    <strong>{item.name}</strong>
                    {item.redeemed && (
                      <span style={{ background: '#4caf50', color: '#fff', fontSize: '11px', padding: '2px 6px', borderRadius: '10px', marginLeft: '8px' }}>
                        FREE
                      </span>
                    )}
                    <div style={{ color: '#888', fontSize: '13px' }}>
                      ₦{item.price.toLocaleString()} × {item.qty} = ₦{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}
                  >
                    ❌
                  </button>
                </div>
              ))}

              {/* Grand Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 'bold', fontSize: '18px' }}>
                <span>Total:</span>
                <span style={{ color: '#f5a623' }}>₦{grandTotal.toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <button
                style={{ width: '100%', marginTop: '16px', background: '#f5a623', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Proceed to Checkout →
              </button>
            </>
            )}
        </div>
      )}

    </div>
  )
}

export default Concessions