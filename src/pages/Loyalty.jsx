import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function Loyalty() {
  const { balance, transactions } = useContext(WalletContext);
  
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>Points Wallet</h1>

      {/* Balance Card */}
      <div
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          width: "320px"
        }}
      >
        <h3 style={{ margin: 0 }}>Available Points</h3>
        <h1 style={{ marginTop: "10px" }}>{balance}</h1>
      </div>

      {/* Transactions */}
      <h2 style={{ marginBottom: "15px" }}>Transaction History</h2>

      <div style={{ maxWidth: "500px" }}>
        {transactions.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              borderBottom: "1px solid #eee",
              alignItems: "center"
            }}
          >
            <span>{t.type}</span>

            <span
              style={{
                color: t.points > 0 ? "green" : "red",
                fontWeight: "bold"
              }}
            >
              {t.points > 0 ? `+${t.points}` : t.points}
            </span>

            <span style={{ color: "#777" }}>{t.date}</span>
            <span>{t.points > 0 ? "🟢 Earned" : "🔴 Redeemed"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loyalty;