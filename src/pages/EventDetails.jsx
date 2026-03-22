import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHome,
  MdEvent,
  MdSearch,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { MdChevronLeft, MdShare, MdKeyboardArrowRight } from "react-icons/md";
import "./EventDetails.css";

const BASE_URL = "https://jambay-backend.onrender.com";

function EventDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event || null;

  const [activeTab, setActiveTab] = useState("Events");
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Events", "Parking", "Premium"];

  useEffect(() => {
    if (!event) {
      navigate("/dashboard");
      return;
    }

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/v1/events/all_events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAllEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const goToSeatBooking = (selectedEvent) => {
    navigate("/seat-booking", { state: { event: selectedEvent } });
  };

  const EventRow = ({ e }) => (
    <div className="ed-event-row" onClick={() => goToSeatBooking(e)}>
      <div className="ed-date-col">
        <p className="ed-date-num">{new Date(e.date).getDate()}</p>
        <p className="ed-date-day">
          {new Date(e.date).toLocaleDateString("en", { weekday: "short" })}
        </p>
      </div>
      <div className="ed-event-card">
        <p className="ed-event-tag">{e.status?.toUpperCase() || "EVENT"}</p>
        <p className="ed-event-title">{e.name}</p>
        <p className="ed-event-info">
          {e.venue} · {e.startTime}
        </p>
      </div>
      <MdKeyboardArrowRight size={20} color="#64748B" />
    </div>
  );

  // Group events by month
  const groupedEvents = allEvents.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleDateString("en", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(e);
    return acc;
  }, {});

  return (
    <div className="auth-container" style={{ justifyContent: "flex-start" }}>
      <div className="ed-wrapper">
        {/* Top Bar */}
        <div className="ed-top-bar">
          <button className="ed-back-btn" onClick={() => navigate(-1)}>
            <MdChevronLeft size={20} color="white" />
          </button>
          <button className="ed-share-btn">
            <MdShare size={18} color="white" />
          </button>
        </div>

        {/* Banner Image */}
        <div className="ed-banner">
          {event?.eventImage ? (
            <img
              src={event.eventImage}
              alt={event.name}
              className="ed-banner-img"
            />
          ) : (
            <div className="ed-banner-img" style={{ background: "#1a1a2e" }} />
          )}
          <div className="ed-official-badge">
            <span>🏆</span>
            <p>Official Ticket Marketplace</p>
          </div>
        </div>

        {/* Event Title */}
        <p className="ed-team-title">{event?.name}</p>
        <p className="ed-team-subtitle">{event?.venue}</p>

        {/* Tabs */}
        <div className="ed-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`ed-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Event Rows */}
        {loading ? (
          <div className="ed-loading">Loading events...</div>
        ) : allEvents.length === 0 ? (
          <div className="ed-loading">No events available</div>
        ) : (
          Object.entries(groupedEvents).map(([month, events]) => (
            <div key={month}>
              <div className="ed-month-row">
                <p className="ed-month-title">{month}</p>
                <button className="ed-filter-btn">Home & Away ▾</button>
              </div>
              {events.map((e) => (
                <EventRow key={e._id} e={e} />
              ))}
            </div>
          ))
        )}

        {/* Confirm Button */}
        <button
          className="ed-confirm-btn"
          onClick={() => goToSeatBooking(event)}
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

export default EventDetails;
