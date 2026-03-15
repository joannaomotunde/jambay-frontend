import React from "react";
import { useNavigate } from "react-router-dom";

function Promotions() {
  const navigate = useNavigate();

  const promotions = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Get 10% off your order",
      discount: 10,
      code: "SUMMER10"
    },
    {
      id: 2,
      title: "New User Discount",
      description: "Enjoy 20% off your first purchase",
      discount: 20,
      code: "WELCOME20"
    },
    {
      id: 3,
      title: "Weekend Deal",
      description: "Get 15% off this weekend only",
      discount: 15,
      code: "WEEKEND15"
    }
  ];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>Available Promotions</h1>

      <div style={{ maxWidth: "500px" }}>
        {promotions.map((promo) => (
          <div
            key={promo.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px"
            }}
          >
            <h3>{promo.title}</h3>
            <p>{promo.description}</p>

            <p style={{ fontWeight: "bold", color: "#4f46e5" }}>
              {promo.discount}% OFF
            </p>

            <button
  onClick={() => navigate(`/promotion/${promo.id}`)}
  style={{
    padding: "8px 15px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  View Details
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotions;