import React from "react";
import { useParams } from "react-router-dom";

function PromotionDetail() {

  const { id } = useParams();

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

  const promotion = promotions.find((p) => p.id === Number(id));

  if (!promotion) {
    return <p>Promotion not found</p>;
  }

  const copyCode = () => {
  navigator.clipboard.writeText(promotion.code);
  alert("Discount code copied!");
};

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>{promotion.title}</h1>

      <p>{promotion.description}</p>

      <h2 style={{ color: "#4f46e5" }}>
        {promotion.discount}% OFF
      </h2>

      <div
  style={{
    marginTop: "20px",
    padding: "15px",
    border: "1px dashed #4f46e5",
    display: "inline-block",
    fontWeight: "bold"
  }}
>
  Discount Code: {promotion.code}
</div>

<br /><br />

<button
  onClick={copyCode}
  style={{
    padding: "8px 15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Copy Code
</button>
    </div>
  );
}

export default PromotionDetail;