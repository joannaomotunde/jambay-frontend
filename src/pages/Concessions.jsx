import { useEffect, useState } from 'react'
import axios from 'axios'

function Concessions() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/shop/products`)
        console.log('Products:', response.data)
        setProducts(response.data)
      } catch (error) {
        console.log('Error:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h2>Concessions Test</h2>
      {products.map(product => (
        <div key={product._id}>
          <p>{product.name} — ₦{product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Concessions