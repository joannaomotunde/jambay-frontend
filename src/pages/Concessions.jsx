import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Concessions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "https://jambay-backend.onrender.com";
const categories = ["All", "Food", "Drinks", "Merchandise"];

const Concessions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event || null;
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;
  const loyaltyChecked = location.state?.loyaltyChecked || false;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/v1/shop/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Products:", JSON.stringify(data));

        const raw = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        // Map API fields to local format
        const mapped = raw.map((p) => ({
          id: p._id,
          name: p.name,
          description: p.description || "",
          price: p.price,
          stock: p.stock,
          image: p.productImage || p.images?.[0] || null,
          // API has no category field yet — default to Merchandise, adjust when backend adds it
          category: p.category || "Merchandise",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Products fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseQty = (itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.id !== itemId);
      return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const removeFromCart = (itemId) =>
    setCart((prev) => prev.filter((i) => i.id !== itemId));

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const grandTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const getItemQty = (itemId) => cart.find((i) => i.id === itemId)?.qty || 0;

  const proceedToCheckout = () => {
    navigate("/payment-auth", {
      state: {
        event,
        selectedSeats,
        totalAmount: totalAmount + grandTotal,
        loyaltyChecked,
        concessions: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
        })),
      },
    });
  };

  return (
    <div className="concessions-page">
      {/* Header */}
      <div className="concessions-header">
        <button
          onClick={() => setShowCart(!showCart)}
          className={`cart-btn ${showCart ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="heart-btn">
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
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <p style={{ color: "white", textAlign: "center", padding: 20 }}>
          Loading products...
        </p>
      ) : filteredItems.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center", padding: 20 }}>
          No items in this category
        </p>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 8,
                    marginBottom: 8,
                    background: "#2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                >
                  🛍
                </div>
              )}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.stock <= 3 && item.stock > 0 && (
                <p style={{ color: "#f59e0b", fontSize: 11 }}>
                  Only {item.stock} left
                </p>
              )}
              {item.stock === 0 && (
                <p style={{ color: "#ef4444", fontSize: 11 }}>Out of stock</p>
              )}
              <div className="menu-card-footer">
                <span className="item-price">
                  ₦{item.price.toLocaleString()}
                </span>
                {item.stock === 0 ? (
                  <span style={{ color: "#666", fontSize: 12 }}>
                    Unavailable
                  </span>
                ) : getItemQty(item.id) > 0 ? (
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span className="qty-number">{getItemQty(item.id)}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>
                      +
                    </button>
                  </div>
                ) : (
                  <button className="add-btn" onClick={() => addToCart(item)}>
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Bottom Sheet */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div
            className="cart-bottom-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-sheet-handle" />
            <h2>🛒 Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty. Add some items!</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <strong>{item.name}</strong>
                      <div className="cart-item-price">
                        ₦{item.price.toLocaleString()} × {item.qty} = ₦
                        {(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">
                    ₦{grandTotal.toLocaleString()}
                  </span>
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
  );
};

export default Concessions;
