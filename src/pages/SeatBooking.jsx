import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHome,
  MdEvent,
  MdSearch,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { MdChevronLeft, MdInfo, MdKeyboardArrowDown } from "react-icons/md";
import arenaImg from "../assets/images/Rectangle 380.png";
import seat115 from "../assets/images/Rectangle 386.png";
import seat107 from "../assets/images/Rectangle new.png";
import seat135 from "../assets/images/Rectangle 389.png";
import seat97 from "../assets/images/Rectangle 391.png";
import seat155 from "../assets/images/Rectangle 393.png";
import "./SeatBooking.css";
import "./Dashboard.css";

const BASE_URL = "https://jambay-backend.onrender.com";
const seatImgs = [seat115, seat107, seat135, seat97, seat155];

function SeatBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || null;

  const [activeFilter, setActiveFilter] = useState(null);
  const [sections, setSections] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ["Quantity", "Perks", "Price excl. fees", "Seat"];

  useEffect(() => {
    if (!event?._id) {
      navigate("/dashboard");
      return;
    }

    const fetchSeatingLayout = async () => {
      try {
        const token = localStorage.getItem("token");

        // GET /api/v1/events/:eventId — backend team confirmed this returns seating layout
        const eventRes = await fetch(`${BASE_URL}/api/v1/events/${event._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const eventData = await eventRes.json();
        console.log("Event detail response:", JSON.stringify(eventData));

        const rawConfig =
          eventData.event?.seatingConfig || eventData.seatingConfig || null;

        if (!rawConfig) {
          setError("No seating config found for this event");
          return;
        }

        // Case 1: seatingConfig is already populated with sections
        if (typeof rawConfig === "object" && rawConfig.sections) {
          setSections(rawConfig.sections);
          setTotalCapacity(rawConfig.capacity || null);
          return;
        }

        // Case 2: seatingConfig is just an ID string
        // Use GET /api/v1/events/:eventId/seats to get seat data grouped by section
        const seatsRes = await fetch(
          `${BASE_URL}/api/v1/events/${event._id}/seats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const seatsData = await seatsRes.json();
        console.log("Seats response:", JSON.stringify(seatsData));

        // Try to get sections from seatsData directly
        const directSections =
          seatsData.sections ||
          seatsData.seatingConfig?.sections ||
          seatsData.seating?.sections ||
          null;

        if (directSections) {
          setSections(directSections);
          setTotalCapacity(
            seatsData.capacity ||
              seatsData.seatingConfig?.capacity ||
              seatsData.seating?.capacity ||
              null,
          );
          return;
        }

        // Fallback: group individual seats by section name
        const seats = seatsData.seats || seatsData.data || [];
        if (seats.length > 0) {
          const sectionMap = {};
          seats.forEach((seat) => {
            const name = seat.section || seat.sectionName || "General";
            if (!sectionMap[name]) {
              sectionMap[name] = {
                _id: seat.sectionId || name,
                name,
                totalSeats: 0,
                rows: 0,
                seatsPerRow: 0,
              };
            }
            sectionMap[name].totalSeats += 1;
          });
          setSections(Object.values(sectionMap));
          setTotalCapacity(seats.length);
        } else {
          setError("No seating data available for this event");
        }
      } catch (err) {
        console.error("Seating layout error:", err);
        setError("Failed to load seating layout");
      } finally {
        setLoading(false);
      }
    };

    fetchSeatingLayout();
  }, [event]);

  const goToSeatMap = (section) => {
    navigate("/seat-map", {
      state: {
        event,
        seat: {
          sectionId: section._id,
          section: section.name,
          rows: section.rows,
          seatsPerRow: section.seatsPerRow,
          totalSeats: section.totalSeats || section.rows * section.seatsPerRow,
        },
      },
    });
  };

  return (
    <div className="auth-container" style={{ justifyContent: "flex-start" }}>
      <div className="sb-wrapper">
        {/* Top Bar */}
        <div className="sb-top-bar">
          <button className="sb-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <div className="sb-top-center">
            <p className="sb-event-name">{event?.name}</p>
            <p className="sb-event-date">
              {event?.date
                ? new Date(event.date).toLocaleDateString("en", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                    year: "numeric",
                  })
                : ""}
              {event?.startTime ? ` · ${event.startTime}` : ""}
            </p>
          </div>
          <button className="sb-info-btn">
            <MdInfo size={20} color="white" />
          </button>
        </div>

        {/* Venue */}
        <div className="sb-venue">
          <p className="sb-venue-text">📍 {event?.venue}</p>
        </div>

        {/* Filter Pills */}
        <div className="sb-filters">
          <button className="sb-filter-icon">⚙️</button>
          {filters.map((f) => (
            <button
              key={f}
              className={`sb-filter-pill${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Event Image */}
        <div className="sb-arena">
          <img
            src={event?.eventImage || arenaImg}
            alt={event?.name || "arena"}
            className="sb-arena-img"
          />
        </div>

        {/* Listings Header */}
        <div className="sb-listings-header">
          <p className="sb-listings-count">
            {totalCapacity ? `${totalCapacity} total seats` : ""}
            {sections.length > 0 ? ` · ${sections.length} sections` : ""}
          </p>
          <button className="sb-sort-btn">
            Sort by <MdKeyboardArrowDown size={16} />
          </button>
        </div>

        {/* Section Cards */}
        {loading ? (
          <p style={{ color: "white", textAlign: "center", padding: "20px" }}>
            Loading seats...
          </p>
        ) : error ? (
          <p style={{ color: "#ef4444", textAlign: "center", padding: "20px" }}>
            {error}
          </p>
        ) : sections.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center", padding: "20px" }}>
            No seating data available for this event
          </p>
        ) : (
          sections.map((section, i) => (
            <div
              key={section._id || i}
              className="sb-listing-card"
              onClick={() => goToSeatMap(section)}
            >
              <img
                src={seatImgs[i % seatImgs.length]}
                alt={section.name}
                className="sb-seat-img"
              />
              <div className="sb-seat-info">
                <p className="sb-seat-section">{section.name}</p>
                {section.rows > 0 && (
                  <p className="sb-seat-row">
                    {section.rows} rows · {section.seatsPerRow} seats per row
                  </p>
                )}
                <p className="sb-seat-row">
                  {section.totalSeats || section.rows * section.seatsPerRow}{" "}
                  total seats
                </p>
                <span className="sb-badge">⭐ Available</span>
              </div>
              <div className="sb-seat-price">
                <p className="sb-price-sub">Tap to select</p>
              </div>
            </div>
          ))
        )}

        {/* Confirm */}
        <button
          className="sb-confirm-btn"
          onClick={() => sections.length > 0 && goToSeatMap(sections[0])}
          disabled={sections.length === 0 || loading}
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
          <button className="db-nav-btn active">
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
      </div>
    </div>
  );
}

export default SeatBooking;
