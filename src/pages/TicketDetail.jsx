import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHome,
  MdEvent,
  MdSearch,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import {
  MdChevronLeft,
  MdShare,
  MdKeyboardArrowDown,
  MdInfo,
} from "react-icons/md";
import "./TicketDetail.css";

function TicketDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event || null;
  const selectedSeats = location.state?.selectedSeats || [];
  const totalAmount = location.state?.totalAmount || 0;
  const seatCount = selectedSeats.length;

  // Use label (seat number) not _id for display
  const seatLabelsStr = selectedSeats.map((s) => s.label || s.id).join(", ");
  const sectionName = selectedSeats[0]?.section || event?.venue || "";
  const rowLabel = selectedSeats[0]?.row ? `Row ${selectedSeats[0].row}` : "";
  const priceEach = seatCount ? (totalAmount / seatCount).toFixed(2) : 0;

  const [loyaltyChecked, setLoyaltyChecked] = useState(false);
  const [showConcessionPopup, setShowConcessionPopup] = useState(false);

  const goToPayment = (withConcessions) => {
    const target = withConcessions ? "/concessions" : "/payment-auth";
    navigate(target, {
      state: {
        event,
        selectedSeats,
        totalAmount,
        loyaltyChecked,
        concessions: [],
      },
    });
  };

  return (
    <div className="auth-container" style={{ justifyContent: "flex-start" }}>
      <div className="td-wrapper">
        {/* Top Bar */}
        <div className="td-top-bar">
          <button className="td-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <button className="td-share-btn">
            <MdShare size={18} color="white" />
          </button>
        </div>

        {/* Event Image */}
        <div className="td-carousel">
          <div className="td-img-main">
            {event?.eventImage && (
              <img
                src={event.eventImage}
                alt={event.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            )}
          </div>
          <div className="td-img-side">
            <div className="td-img-small">
              {event?.eventImage && (
                <img
                  src={event.eventImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </div>
            <div className="td-img-small td-img-overlay">
              <span>🔍 View all</span>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="td-event-info">
          <p className="td-event-title">
            {event?.name || "Event"}
            {rowLabel ? `, ${rowLabel}` : ""}
          </p>
          {sectionName && (
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>
              📍 {sectionName}
            </p>
          )}
          <p className="td-event-price">
            ₦{Number(priceEach).toLocaleString()}
            <span className="td-price-sub"> each incl. fees</span>
          </p>
        </div>

        {/* Badges */}
        <div className="td-badges">
          <div className="td-badge">
            <span>⚡</span>
            <div>
              <p className="td-badge-title">Instant purchase & delivery</p>
              <p className="td-badge-sub">Mobile tickets</p>
            </div>
            <MdInfo size={16} color="#64748B" />
          </div>
        </div>

        {/* Official Marketplace */}
        <div className="td-marketplace">
          <div className="td-marketplace-left">
            <p className="td-marketplace-title">Official Ticket Marketplace</p>
            <p className="td-marketplace-sub">
              Tickets are reviewed and verified
            </p>
          </div>
          <div className="td-nba-logo">✓</div>
        </div>

        {/* Quantity */}
        <div className="td-dropdown">
          <p className="td-dropdown-label">Quantity</p>
          <div className="td-dropdown-value">
            <span>
              {seatCount} {seatCount === 1 ? "ticket" : "tickets"}
            </span>
            <MdKeyboardArrowDown size={18} color="#64748B" />
          </div>
        </div>

        {/* Seat Numbers */}
        <div className="td-dropdown">
          <p className="td-dropdown-label">Seat numbers</p>
          <div className="td-dropdown-value">
            <span>{seatLabelsStr || "N/A"}</span>
            <MdKeyboardArrowDown size={18} color="#64748B" />
          </div>
        </div>

        {/* Total Amount */}
        <div className="td-dropdown">
          <p className="td-dropdown-label">Total</p>
          <div className="td-dropdown-value">
            <span>₦{Number(totalAmount).toLocaleString()}</span>
          </div>
        </div>

        {/* Loyalty Points */}
        <div
          className="td-dropdown"
          onClick={() => setLoyaltyChecked(!loyaltyChecked)}
          style={{ cursor: "pointer" }}
        >
          <p className="td-dropdown-label">Use loyalty points</p>
          <div
            className={`td-loyalty-check ${loyaltyChecked ? "checked" : ""}`}
          >
            {loyaltyChecked && <span>✓</span>}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="td-confirm-btn"
          onClick={() => setShowConcessionPopup(true)}
          disabled={seatCount === 0}
        >
          Confirm
        </button>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn" onClick={() => navigate("/dashboard")}>
            <div className="db-nav-icon-circle">
              <MdHome size={22} />
            </div>
            <p>Home</p>
          </button>
          <button
            className="db-nav-btn active"
            onClick={() => navigate("/events-browse")}
          >
            <div className="db-nav-icon-circle">
              <MdEvent size={22} />
            </div>
            <p>Events</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate("/search")}>
            <div className="db-nav-icon-circle">
              <MdSearch size={22} />
            </div>
            <p>Search</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate("/profile")}>
            <div className="db-nav-icon-circle">
              <MdPerson size={22} />
            </div>
            <p>Profile</p>
          </button>
          <button className="db-nav-btn" onClick={() => navigate("/settings")}>
            <div className="db-nav-icon-circle">
              <MdSettings size={22} />
            </div>
            <p>Settings</p>
          </button>
        </div>

        {/* Concession Popup */}
        {showConcessionPopup && (
          <div
            className="td-popup-overlay"
            onClick={() => setShowConcessionPopup(false)}
          >
            <div className="td-popup" onClick={(e) => e.stopPropagation()}>
              <div className="td-popup-handle" />
              <p className="td-popup-title">🍔 Add Concessions?</p>
              <p className="td-popup-sub">
                Would you like to add food & drinks to your order before
                checkout?
              </p>
              <button
                className="td-popup-yes"
                onClick={() => goToPayment(true)}
              >
                Yes, Add Concessions
              </button>
              <button
                className="td-popup-skip"
                onClick={() => goToPayment(false)}
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetail;
