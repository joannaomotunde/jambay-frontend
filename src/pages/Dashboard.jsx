import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import {
  MdHome,
  MdEvent,
  MdSearch,
  MdPerson,
  MdSettings,
} from "react-icons/md";

// Static fallback images
import trendingSearches from "../assets/images/Trending searches.jpeg";
import fifth from "../assets/images/Fifth.jpeg";
import sixth from "../assets/images/Sixth.jpeg";
import seventh from "../assets/images/Seventh.jpeg";
import eighth from "../assets/images/Eigth.jpeg";
import ticketOnSales from "../assets/images/Tickets on sale.png";
import lostBoys from "../assets/images/Lost boys.png";
import sip from "../assets/images/Sip.jpeg";
import broadway from "../assets/images/Broadway.jpeg";
import nflDeals from "../assets/images/NFL Deals.jpeg";
import nbaDeals from "../assets/images/BA Deals.jpeg";
import lagos from "../assets/images/Lagos.jpeg";
import newYork from "../assets/images/Newyork.jpeg";
import singapore from "../assets/images/Singapore.jpeg";

const BASE_URL = "https://jambay-backend.onrender.com/api/v1";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Hotel");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ["Hotel", "VIP", "Gift cards", "Sell", "Help"];

  const featured = [
    { id: 1, title: "Trending Searches", img: trendingSearches },
    { id: 2, title: "Ticket deals", img: fifth },
    { id: 3, title: "My Tickets", img: sixth },
  ];

  const festivals = [
    {
      id: 1,
      title: "SXSW 2026",
      date: "MARCH 12-18, AUSTIN TEXAS",
      img: seventh,
    },
    { id: 2, title: "Coachella", date: "APRIL 11, INDIO CA", img: seventh },
  ];

  const categories = [
    { id: 1, title: "Concerts", img: eighth },
    { id: 2, title: "Sports", img: ticketOnSales },
    { id: 3, title: "Theatre", img: lostBoys },
  ];

  const offers = [
    {
      id: 1,
      title: "Sips & Sounds Music Festival",
      date: "MARCH 13-14, 2026 AUDITORIUM SHORES AUSTIN, TEXAS",
      img: sip,
    },
  ];

  const guides = [
    { id: 1, title: "Broadway deals", img: broadway },
    { id: 2, title: "NFL deals", img: nflDeals },
    { id: 3, title: "NBA deals", img: nbaDeals },
  ];

  const cities = [
    { id: 1, title: "Lagos", img: lagos },
    { id: 2, title: "New York", img: newYork },
    { id: 3, title: "Singapore", img: singapore },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/events/all_events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // Adjust these field names to match your actual API response shape
        const events = data.events || data.data || [];

        setUpcomingEvents(events.slice(0, 5));
        setTrendingEvents(events.slice(0, 3));
        setLiveEvents(events.slice(0, 2));
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Helper to get image URL from event object
  const getEventImage = (event) => {
    return (
      event?.eventImage ||
      event?.image ||
      event?.imageUrl ||
      event?.coverImage ||
      event?.banner ||
      null
    );
  };

  const goToEvent = (event) => {
    navigate("/event-details", { state: { event } });
  };

  return (
    <div className="auth-container" style={{ justifyContent: "flex-start" }}>
      <div className="db-wrapper">
        {/* Filter pills */}
        <div className="db-border-wrapper">
          <div className="db-filters-overlay">
            {filters.map((f) => (
              <button
                key={f}
                className={`db-filter-pill ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Search row */}
        <div className="db-border-wrapper">
          <div className="db-search-overlay">
            <div className="db-search-item">
              <span className="db-search-icon">📍</span>
              <div>
                <div className="db-search-label">LOCATION</div>
                <div className="db-search-sub">City or Zip code</div>
              </div>
            </div>
            <div className="db-search-item">
              <span className="db-search-icon">📅</span>
              <div>
                <div className="db-search-label">DATE</div>
                <div className="db-search-sub">All dates</div>
              </div>
            </div>
            <div className="db-search-item">
              <span className="db-search-icon">🔍</span>
              <div>
                <div className="db-search-label">SEARCH</div>
                <div className="db-search-sub">venues, artists or events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Upcoming Events</h3>
            <button
              className="db-view-all"
              onClick={() => navigate("/events-browse")}
            >
              View all &rsaquo;
            </button>
          </div>
          <div className="db-scroll-row">
            {loading ? (
              <p style={{ color: "#aaa", padding: "12px" }}>
                Loading events...
              </p>
            ) : upcomingEvents.length === 0 ? (
              <p style={{ color: "#aaa", padding: "12px" }}>No events found</p>
            ) : (
              upcomingEvents.map((e) => (
                <div
                  key={e._id || e.id}
                  className="db-event-card db-event-card-lg"
                  onClick={() => goToEvent(e)}
                >
                  <div className="db-event-img-lg">
                    {getEventImage(e) ? (
                      <img
                        src={getEventImage(e)}
                        alt={e.name || e.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#2a2a2a",
                        }}
                      />
                    )}
                  </div>
                  <div className="db-event-info">
                    <p className="db-event-title">{e.name || e.title}</p>
                    <p className="db-event-sub">{e.venue || e.location}</p>
                    <p className="db-event-price">
                      {e.price
                        ? `₦${Number(e.price).toLocaleString()}`
                        : "See tickets"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trending Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Trending events</h3>
            <button
              className="db-view-all"
              onClick={() => navigate("/events-browse")}
            >
              View all &rsaquo;
            </button>
          </div>
          <div className="db-scroll-row">
            {trendingEvents.map((e) => (
              <div
                key={e._id || e.id}
                className="db-event-card db-event-card-lg"
                onClick={() => goToEvent(e)}
              >
                <div className="db-event-img-lg">
                  {getEventImage(e) ? (
                    <img
                      src={getEventImage(e)}
                      alt={e.name || e.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#2a2a2a",
                      }}
                    />
                  )}
                  <div className="db-img-overlay">
                    <p className="db-img-title">{e.name || e.title}</p>
                    <p className="db-img-date">
                      {e.date ? new Date(e.date).toDateString() : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Events */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Live events</h3>
            <button
              className="db-view-all"
              onClick={() => navigate("/events-browse")}
            >
              View all &rsaquo;
            </button>
          </div>
          <div className="db-scroll-row">
            {liveEvents.map((e) => (
              <div
                key={e._id || e.id}
                className="db-event-card db-event-card-lg"
                onClick={() => goToEvent(e)}
              >
                <div className="db-event-img-lg">
                  {getEventImage(e) ? (
                    <img
                      src={getEventImage(e)}
                      alt={e.name || e.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#2a2a2a",
                      }}
                    />
                  )}
                  <div className="db-img-overlay">
                    <p className="db-img-title">{e.name || e.title}</p>
                    <p className="db-img-date">{e.venue || e.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Featured</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-featured-row">
            {featured.map((f) => (
              <div key={f.id} className="db-featured-card">
                <img
                  src={f.img}
                  alt={f.title}
                  style={{
                    width: "100%",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <p className="db-featured-title">{f.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Festivals */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Festivals</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {festivals.map((f) => (
              <div key={f.id} className="db-event-card db-event-card-lg">
                <div className="db-event-img-lg">
                  <img
                    src={f.img}
                    alt={f.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="db-img-overlay">
                    <p className="db-img-title">{f.title}</p>
                    <p className="db-img-date">{f.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Popular Categories</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {categories.map((c) => (
              <div key={c.id} className="db-cat-card">
                <img
                  src={c.img}
                  alt={c.title}
                  className="db-cat-img"
                  style={{ objectFit: "cover" }}
                />
                <p className="db-cat-title">{c.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsored Presales */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Sponsored Presales and Offers</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-scroll-row">
            {offers.map((o) => (
              <div
                key={o.id}
                className="db-event-card"
                style={{ width: "100%" }}
              >
                <div className="db-event-img-lg" style={{ height: "160px" }}>
                  <img
                    src={o.img}
                    alt={o.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="db-img-overlay">
                    <p className="db-img-title">{o.title}</p>
                    <p className="db-img-date">{o.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Entertainment Guides */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Entertainment Guides</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {guides.map((g) => (
              <div key={g.id} className="db-cat-card">
                <img
                  src={g.img}
                  alt={g.title}
                  className="db-cat-img"
                  style={{ objectFit: "cover" }}
                />
                <p className="db-cat-title">{g.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Cities */}
        <div className="db-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Popular Cities</h3>
            <button className="db-view-all">View all &rsaquo;</button>
          </div>
          <div className="db-three-row">
            {cities.map((c) => (
              <div key={c.id} className="db-cat-card">
                <img
                  src={c.img}
                  alt={c.title}
                  className="db-cat-img"
                  style={{ objectFit: "cover" }}
                />
                <p className="db-cat-title">{c.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="db-bottom-nav">
          <button className="db-nav-btn active">
            <div className="db-nav-icon-circle">
              <MdHome size={22} />
            </div>
            <p>Home</p>
          </button>
          <button
            className="db-nav-btn"
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
      </div>
    </div>
  );
}

export default Dashboard;
