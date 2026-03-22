import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./PaymentAuth.css";

const BASE_URL = "https://jambay-backend.onrender.com";

function PaymentAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event || null;
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;
  const loyaltyChecked = location.state?.loyaltyChecked || false;
  const concessions = location.state?.concessions || [];

  const seatLabelsStr = selectedSeats.map((s) => s.label || s.id).join(", ");
  const seatSection = selectedSeats[0]?.section || "";
  const seatRow = selectedSeats[0]?.row ? `Row ${selectedSeats[0].row}` : "";
  const ticketsTotal = selectedSeats.length
    ? totalAmount - concessions.reduce((sum, i) => sum + i.price * i.qty, 0)
    : totalAmount;

  const [expanded, setExpanded] = useState({
    seats: true,
    perks: true,
    loyalty: true,
  });
  const [loading, setLoading] = useState(false);

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePayNow = async () => {
    if (!event?._id) {
      alert("Session expired. Go back and select your seats again.");
      navigate("/dashboard");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("No seats selected. Go back and select your seats.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build payload matching backend spec exactly
      const payload = {
        eventId: event._id, // MongoDB _id
        ticketCategoryId: selectedSeats[0]?.ticketCategoryId || "", // from seat object
        seatIds: selectedSeats.map((s) => s.id), // real seat _ids
        items: concessions.map((i) => ({ product: i.id, qty: i.qty })), // product _ids
      };

      console.log("Checkout payload:", JSON.stringify(payload));

      const response = await fetch(`${BASE_URL}/api/v1/tickets/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Checkout response:", JSON.stringify(data));

      if (!response.ok) {
        alert(`Checkout failed: ${data.message || response.statusText}`);
        return;
      }

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        alert("Payment link not generated. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(`Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="pa-wrapper">
        {/* EVENT SUMMARY */}
        <div className="pa-event-card">
          {event?.eventImage && (
            <img
              src={event.eventImage}
              alt={event.name}
              className="pa-event-img"
              style={{ objectFit: "cover" }}
            />
          )}
          {!event?.eventImage && <div className="pa-event-img" />}
          <div className="pa-event-info">
            <p className="pa-event-title">{event?.name || "Event"}</p>
            <p className="pa-event-date">
              {event?.date ? new Date(event.date).toDateString() : ""}
              {event?.startTime ? ` · ${event.startTime}` : ""}
            </p>
            <p className="pa-event-venue">{event?.venue || ""}</p>
            {(seatSection || seatRow) && (
              <div className="pa-event-seat">
                🎫{" "}
                <span>{[seatSection, seatRow].filter(Boolean).join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        {/* ORDER TOTAL */}
        <div className="pa-accordion">
          <div className="pa-accordion-header" style={{ cursor: "default" }}>
            <p>Order Total</p>
            <p style={{ fontWeight: 700, color: "#22c55e" }}>
              ₦{Number(totalAmount).toLocaleString()}
            </p>
          </div>
        </div>

        {/* SEATS */}
        <div className="pa-accordion">
          <button
            className="pa-accordion-header"
            onClick={() => toggle("seats")}
          >
            <p>Your Seats ({selectedSeats.length})</p>
            {expanded.seats ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.seats && (
            <div className="pa-accordion-body">
              <p>
                {seatSection} {seatRow}
              </p>
              <p style={{ color: "#94a3b8", fontSize: 13 }}>
                Seat numbers: {seatLabelsStr || "N/A"}
              </p>
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>
                Subtotal: ₦{Number(ticketsTotal).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* CONCESSIONS */}
        <div className="pa-accordion">
          <button
            className="pa-accordion-header"
            onClick={() => toggle("perks")}
          >
            <p>Concessions</p>
            {expanded.perks ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          {expanded.perks && (
            <div className="pa-accordion-body">
              <div className="pa-perks-card">
                <h3 className="pa-perks-title">🧾 Order Summary</h3>
                {concessions.length > 0 ? (
                  <>
                    {concessions.map((item, i) => (
                      <div key={i} className="pa-perks-item">
                        <p>
                          {item.name} × {item.qty}
                        </p>
                        <p>₦{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    ))}
                    <div className="pa-perks-total">
                      <p>Subtotal</p>
                      <p>
                        ₦
                        {concessions
                          .reduce((sum, i) => sum + i.price * i.qty, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="pa-perks-pickup">
                      <p className="pa-pickup-title">Pickup Details</p>
                      <p>📍 Concessions Stand C - Gate 5</p>
                      <p>⏱ 1–5 mins after payment</p>
                      <p>📱 Show QR code at pickup</p>
                    </div>
                  </>
                ) : (
                  <p className="pa-empty">No concessions added</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* LOYALTY */}
        {loyaltyChecked && (
          <div className="pa-accordion">
            <button
              className="pa-accordion-header"
              onClick={() => toggle("loyalty")}
            >
              <p>Loyalty Points</p>
              {expanded.loyalty ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </button>
            {expanded.loyalty && (
              <div className="pa-accordion-body">
                <p>
                  🎉 You will earn {Math.floor(totalAmount / 2)} loyalty points
                  from this purchase
                </p>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="pa-actions">
          <button
            className="pa-pay-btn"
            onClick={handlePayNow}
            disabled={loading}
          >
            {loading
              ? "Processing…"
              : `Pay ₦${Number(totalAmount).toLocaleString()}`}
          </button>
          <button className="pa-cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentAuth;
