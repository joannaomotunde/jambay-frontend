import "../pages/ticketing.css";
import { Link } from "react-router-dom";

const EventDetailsTwo = ({ price }) => {
  const events = [
    {
      date: "26",
      day: "Thu",
      tag: "ROAD OPENER",
      title: "vs Utah Jazz",
      price: price,
      location: "Salt Lake City, UT",
    },
    {
      date: "28",
      day: "Sat",
      tag: "AWAY",
      title: "vs Indiana Pacers",
      price: "$20",
      location: "Indianapolis, IN",
    },
    {
      date: "30",
      day: "Mon",
      tag: "HOME OPENER",
      title: "vs Golden State Warriors",
      price: "$25",
      location: "New York, NY",
    },
  ];

  const aprilEvents = [
    {
      date: "03",
      day: "Fri",
      tag: "HOME",
      title: "vs Indiana Pacers",
      price: "$20",
      location: "New York, NY",
    },
    {
      date: "05",
      day: "Sun",
      tag: "AWAY",
      title: "vs Brooklyn Nets",
      price: "$13",
      location: "Brooklyn, NY",
    },
    {
      date: "07",
      day: "Tue",
      tag: "HOME",
      title: "vs Washington Wizards",
      price: "$15",
      location: "New York, NY",
    },
  ];

  return (
    <div className="mobile-container">
      {/* <div className="banner-container">
        <img src={nba} alt="banner" className="banner-img" />
      </div> */}

      <div className="tabs">
        <span className="active">Events</span>
        <span>Parking</span>
        <span>Premium</span>
      </div>

      <div className="filter-row">
        <h3>March 2026</h3>
        <button className="filter-btn">Home & Away</button>
      </div>

      {events.map((event, index) => (
        <div className="event-row" key={index}>
          <div className="event-date">
            <h2>{event.date}</h2>
            <p>{event.day}</p>
          </div>

          <div className="event-card">
            <p className="event-tag">{event.tag}</p>
            <h4>{event.title}</h4>
            <p className="event-info">
              {event.price} · 9:00PM ET · {event.location}
            </p>
          </div>
        </div>
      ))}

      <h3 className="month-header">April 2026</h3>

      {aprilEvents.map((event, index) => (
        <div className="event-row" key={index}>
          <div className="event-date">
            <h2>{event.date}</h2>
            <p>{event.day}</p>
          </div>

          <div className="event-card">
            <p className="event-tag">{event.tag}</p>
            <h4>{event.title}</h4>
            <p className="event-info">
              {event.price} · 9:00PM ET · {event.location}
            </p>
          </div>
        </div>
      ))}

      <button className="confirm-btn">Confirm</button>

      <div className="bottom-nav">
        <span>🏠</span>
        <span>📅</span>
        <span>🔍</span>
        <span>👤</span>
        <span>⚙️</span>
      </div>
    </div>
  );
};

export default EventDetailsTwo;
