import React from "react";
import boston from "../assets/images/boston.png";
import nba from "../assets/images/NBA Badge.png";
import "./ticketing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faFileArrowUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { useParams, useNavigate } from "react-router-dom";
import seatMap from "../components/SeatMap";
import EventDetailsTwo from "../components/EventDetailsTwo";

const Ticketing = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = seatMap[eventId] || seatMap["1"];

  const handleConfirm = () => {
    navigate(`/event/${eventId}`);
  };
  return (
    <div className="page-container">
      <header>
        <div className="header">
          <img src={boston} alt="boston" height={386} width={416} />
          <div className="top-icons">
            <div>
              <FontAwesomeIcon icon={faAngleLeft} className="arrow" />
            </div>
            <div className="right">
              <div>
                <FontAwesomeIcon icon={faHeart} className="heart" />
              </div>
              <div>
                <FontAwesomeIcon icon={faFileArrowUp} className="heart" />
              </div>
            </div>
          </div>
          <div className="official">
            <img src={nba} alt="nba" />
            <p>Official Ticket Marketplace</p>
          </div>
        </div>
        <h3 className="york">New York Knicks</h3>
      </header>
      <EventDetailsTwo
        // image={nba}
        // section="115"
        // row="11"
        price="$150"
        // rating="10"
        // onClick={() => console.log("Seat selected")}
      />

      <div className="ticket-page">
        {/* EVENT HEADER */}

        <div className="event-header">
          <div className="event-title">{event.title}</div>

          <div className="event-date">{event.date}</div>

          <div className="event-location">{event.location}</div>
        </div>

        {/* FILTER BAR */}

        <div className="filter-bar">
          <button className="filter-btn">⚙</button>
          <button className="filter-btn">Quantity</button>
          <button className="filter-btn">Perks</button>
          <button className="filter-btn">Price excl. fees</button>
          <button className="filter-btn">Seat</button>
        </div>

        {/* ARENA IMAGE */}

        <div className="arena-container">
          <img src={event.arena} alt="arena" />
        </div>

        {/* LISTINGS */}

        <div className="listing-container">
          <div className="listing-header">
            <h3>1,165 listings</h3>

            <span>Sort by ▼</span>
          </div>

          {event.eventCard.map((seat) => (
            <div className="listing-card" key={seat.id}>
              <img src={seat.image} className="seat-img" alt="" />

              <div className="seat-info">
                <h3>{seat.section}</h3>

                <p>{seat.row}</p>

                <div className="rating">{seat.rating}</div>
              </div>

              <div className="seat-price">
                <h3>{seat.price}</h3>

                <p>incl. fees</p>
              </div>
            </div>
          ))}
        </div>

        {/* CONFIRM BUTTON */}

        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>

        {/* BOTTOM NAV */}

        <div className="bottom-nav">
          <div className="nav-icon">🏠</div>
          <div className="nav-icon">📅</div>
          <div className="nav-icon">🔍</div>
          <div className="nav-icon">👤</div>
          <div className="nav-icon">⚙</div>
        </div>
      </div>
    </div>
  );
};

export default Ticketing;
