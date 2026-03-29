import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SeatMap.css";

const BASE_URL = "https://jambay-backend.onrender.com";

function SeatMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || null;
  const seatInfo = location.state?.seat || null;

  const [seats, setSeats] = useState([]);
  const [seatTimers, setSeatTimers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(seatInfo?.section || null);
  const [sections, setSections] = useState([]);

  // Get ticket rate from event ticketCategories
  const ticketRate = event?.ticketCategories?.[0]?.basePrice ||
                     event?.ticketCategories?.[0]?.currentPrice ||
                     5000

  const selectedSeats = seats.filter((s) => s.status === "selected");
  const totalAmount = selectedSeats.length * ticketRate;

  useEffect(() => {
    if (!event?._id) {
      navigate("/dashboard");
      return;
    }

    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${BASE_URL}/api/v1/events/${event._id}/seats`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        console.log("Seats response:", JSON.stringify(data));

        const rawSeats = data.seats || data.data || [];

        const uniqueSections = [
          ...new Set(rawSeats.map((s) => s.section || "General")),
        ];
        setSections(uniqueSections);
        if (!activeSection) setActiveSection(uniqueSections[0]);

        const mapped = rawSeats.map((s) => ({
          id: s._id,
          label: String(s.seatNumber ?? s.number ?? s.label ?? ""),
          section: s.section || "General",
          row: s.row ?? 1,
          status:
            s.status === "booked" || s.isBooked || s.status === "reserved"
              ? "booked"
              : "empty",
          ticketCategoryId:
            event?.ticketCategories?.[0]?._id ||
            s.ticketCategory ||
            s.ticketCategoryId ||
            "",
        }));

        setSeats(mapped);
      } catch (err) {
        console.error("Seats fetch error:", err);
        setError("Failed to load seats");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
    return () => Object.values(seatTimers).forEach((t) => clearTimeout(t));
  }, [event]);

  const toggleSeat = (id) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== id || s.status === "booked") return s;
        if (s.status === "selected") {
          if (seatTimers[id]) clearTimeout(seatTimers[id]);
          setSeatTimers((p) => { const t = { ...p }; delete t[id]; return t; });
          return { ...s, status: "empty" };
        }
        const timer = setTimeout(() => {
          setSeats((p) => p.map((x) => (x.id === id ? { ...x, status: "empty" } : x)));
          setSeatTimers((p) => { const t = { ...p }; delete t[id]; return t; });
        }, 5 * 60 * 1000);
        setSeatTimers((p) => ({ ...p, [id]: timer }));
        return { ...s, status: "selected" };
      })
    );
  };

  const removeLastSeat = () => {
    if (!selectedSeats.length) return;
    const last = selectedSeats[selectedSeats.length - 1];
    if (seatTimers[last.id]) clearTimeout(seatTimers[last.id]);
    setSeatTimers((p) => { const t = { ...p }; delete t[last.id]; return t; });
    setSeats((prev) => prev.map((s) => (s.id === last.id ? { ...s, status: "empty" } : s)));
  };

  const handleNext = () => {
    navigate("/ticket-detail", {
      state: {
        event,
        seat: seatInfo,
        selectedSeats: selectedSeats.map((s) => ({
          id: s.id,
          _id: s.id,
          label: s.label,
          section: s.section,
          row: s.row,
          ticketCategoryId: s.ticketCategoryId,
        })),
        totalAmount,
        ticketRate,
        seatCount: selectedSeats.length,
      },
    });
  };

  const visibleSeats = seats.filter((s) => s.section === activeSection);
  const rowMap = {};
  visibleSeats.forEach((s) => {
    if (!rowMap[s.row]) rowMap[s.row] = [];
    rowMap[s.row].push(s);
  });
  const rowEntries = Object.entries(rowMap).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  return (
    <div className="seat-page">
      {/* Header */}
      <div className="seat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="seat-title">Select your Seat</h1>
      </div>

      {/* Section Tabs */}
      {sections.length > 1 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", padding: "8px 16px" }}>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              style={{
                padding: "6px 16px", borderRadius: 20, border: "none",
                background: activeSection === sec ? "#22C55E" : "#2a2a2a",
                color: activeSection === sec ? "#000" : "#fff",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
              }}
            >
              {sec}
            </button>
          ))}
        </div>
      )}

      {/* Seat Counter */}
      <div className="seat-counter">
        <span className="seat-counter-label">Selected</span>
        <div className="seat-counter-controls">
          {selectedSeats.length > 0 ? (
            <>
              <button className="counter-btn minus" onClick={removeLastSeat}>−</button>
              <span className="counter-value">{String(selectedSeats.length).padStart(2, "0")}</span>
              <button className="counter-btn plus" onClick={() => {}}>+</button>
            </>
          ) : (
            <span className="counter-value">00</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-box booked"></div>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box empty"></div>
          <span>Available</span>
        </div>
      </div>

      {/* Stage indicator */}
      <div style={{
        margin: "8px 16px", padding: "6px", background: "#1a1a1a",
        borderRadius: 8, textAlign: "center", color: "#aaa",
        fontSize: 12, letterSpacing: 2, border: "1px solid #333",
      }}>
        ▲ STAGE / PITCH
      </div>

      {/* Seat Grid */}
      {loading ? (
        <p style={{ color: "white", textAlign: "center", padding: 20 }}>Loading seats...</p>
      ) : error ? (
        <p style={{ color: "#ef4444", textAlign: "center", padding: 20 }}>{error}</p>
      ) : visibleSeats.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center", padding: 20 }}>No seats found</p>
      ) : (
        <div style={{ padding: "8px 16px", overflowY: "auto", maxHeight: 320 }}>
          {rowEntries.map(([row, rowSeats]) => (
            <div key={row} style={{ display: "flex", alignItems: "center", marginBottom: 6, gap: 4 }}>
              <span style={{ color: "#666", fontSize: 11, width: 24, textAlign: "right", flexShrink: 0 }}>
                R{row}
              </span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1, justifyContent: "center" }}>
                {rowSeats
                  .sort((a, b) => Number(a.label) - Number(b.label))
                  .map((s) => (
                    <button
                      key={s.id}
                      className={`seat-btn seat--${s.status}`}
                      onClick={() => toggleSeat(s.id)}
                      disabled={s.status === "booked"}
                      style={{ width: 32, height: 32, fontSize: 11, flexShrink: 0 }}
                    >
                      {s.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Summary */}
      <div className="seat-summary">
        <div className="summary-item">
          <span className="summary-label">Rate</span>
          <strong className="summary-value">
            ₦{Number(ticketRate).toLocaleString()}
          </strong>
        </div>
        <div className="summary-item">
          <span className="summary-label">Tickets</span>
          <strong className="summary-value">
            {String(selectedSeats.length).padStart(2, "0")}
          </strong>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total</span>
          <strong className="summary-value">
            ₦{Number(totalAmount).toLocaleString()}
          </strong>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <p style={{ textAlign: "center", color: "#DC2626", fontSize: 12, fontWeight: 600, padding: "0 16px" }}>
          Seats release in 5 mins if not confirmed
        </p>
      )}

      <button
        className="next-btn"
        onClick={handleNext}
        disabled={selectedSeats.length === 0}
      >
        Next
      </button>
    </div>
  );
}

export default SeatMap;
