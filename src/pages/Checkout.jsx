import React, { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";

function Checkout() {

  const { balance, redeemPoints } = useContext(WalletContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState("");

  const applyPoints = () => {
  const points = Number(pointsToRedeem);

  if (!points || points <= 0) {
    alert("Enter a valid number of points");
    return;
  }

  if (balance >= points) {
    redeemPoints(points);
    setShowConfirm(false);
    setPointsToRedeem("");
    alert(`${points} points redeemed successfully!`);
  } else {
    alert("Not enough points");
  }
};

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h1>Checkout</h1>

      <p>Available Points: {balance}</p>
      <div style={{ margin: "20px 0" }}>
  <label>
    Points to Redeem: 
    <input
      type="number"
      value={pointsToRedeem}
      onChange={(e) => setPointsToRedeem(e.target.value)}
      style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
    />
  </label>
</div>

      <button
  onClick={() => setShowConfirm(true)}
  style={{
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Redeem Points
</button>

      {showConfirm && (
  <div style={{ marginTop: "20px" }}>

    <p>Are you sure you want to redeem {pointsToRedeem} points?</p>

    <button
      onClick={applyPoints} // call function when confirming
      style={{ marginRight: "10px" }}
    >
      Confirm
    </button>

    <button onClick={() => setShowConfirm(false)}>
      Cancel
    </button>

  </div>
)}

    </div>
  );
}

export default Checkout;