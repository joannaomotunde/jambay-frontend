import { useState } from 'react'

const menuItems = [
  { id: 1, name: 'Burger', category: 'Food', price: 2500, description: 'Juicy beef burger with fries' },
  { id: 2, name: 'Pizza Slice', category: 'Food', price: 1800, description: 'Cheesy pepperoni pizza' },
  { id: 3, name: 'Hot Dog', category: 'Food', price: 1200, description: 'Classic hot dog with mustard' },
  { id: 4, name: 'Popcorn', category: 'Food', price: 800, description: 'Milky white popcorn' },
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

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>🍔 Concessions</h1>
        <div style={{ background: '#f5a623', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '16px', background: '#fff' }}>
            <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 8px' }}>{item.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#f5a623' }}>₦{item.price.toLocaleString()}</span>
              <button
                onClick={() => addToCart(item)}
                style={{ background: '#f5a623', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Concessions