// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../App.css";
// import EventCard from "../components/EventCard";

// function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };
//   const events = [
//     { id: 1, title: "Afrobeats Festival", date: "May 12", location: "Lagos" },
//     { id: 2, title: "Tech Conference", date: "June 5", location: "Abuja" },
//     { id: 3, title: "Comedy Night", date: "July 2", location: "Ibadan" },
//   ];
//   return (
//     <div className="dashboard-container">
//       {/* Welcome */}
//       <div className="welcome-row center">
//         <h2>Welcome, {user?.name} 👋</h2>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Top Menu */}
//       <div className="menu-bar center">
//         <button>Explore</button>
//         <button>Favorites</button>
//         <button>Wallet</button>
//         <button>Saved</button>
//         <button>My Tickets</button>
//       </div>

//       {/* Upcoming Events */}
//       <div className="section center">
//         <div className="section-header">
//           <h3>Upcoming Events</h3>
//         </div>
//         <div className="event-cover">
//           <div className="event-row">
//             {events.map((event) => (
//               <EventCard
//                 key={event.id}
//                 title={event.title}
//                 date={event.date}
//                 location={event.location}
//               />
//             ))}
//           </div>
//           <div>
//             <p>View all</p>
//           </div>
//         </div>
//       </div>

//       {/* Just for you */}
//       <div className="section center">
//         <div className="section-header">
//           <h3>Just for you</h3>
//         </div>

//         <div className="event-cover">
//           <div className="event-row">
//             {events.map((event) => (
//               <EventCard
//                 key={event.id}
//                 title={event.title}
//                 date={event.date}
//                 location={event.location}
//               />
//             ))}
//           </div>
//           <div>
//             <p>View all</p>
//           </div>
//         </div>
//       </div>

//       {/* Trending events */}
//       <div className="section center">
//         <div className="section-header">
//           <h3>Trending events</h3>
//         </div>

//         <div className="event-cover">
//           <div className="event-row">
//             {events.map((event) => (
//               <EventCard
//                 key={event.id}
//                 title={event.title}
//                 date={event.date}
//                 location={event.location}
//               />
//             ))}
//           </div>
//           <div>
//             <p>View all</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import EventCard from "../components/EventCard";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const events = [
    { id: 1, title: "Afrobeats Festival", date: "May 12", location: "Lagos" },
    { id: 2, title: "Tech Conference", date: "June 5", location: "Abuja" },
    { id: 3, title: "Comedy Night", date: "July 2", location: "Ibadan" },
  ];

  // ⭐ CHANGE: function to navigate to seat selection
  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="dashboard-container">
      {/* Welcome */}
      <div className="welcome-row center">
        <h2>Welcome, {user?.name} 👋</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Top Menu */}
      <div className="menu-bar center">
        <button>Explore</button>
        <button>Favorites</button>
        <button>Wallet</button>
        <button>Saved</button>
        <button>My Tickets</button>
      </div>

      {/* Upcoming Events */}
      <div className="section center">
        <div className="section-header">
          <h3>Upcoming Events</h3>
        </div>
        <div className="event-cover">
          <div className="event-row">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                onClick={() => handleEventClick(event)} // ⭐ CHANGE
              />
            ))}
          </div>
          <div>
            <p>View all</p>
          </div>
        </div>
      </div>

      {/* Just for you */}
      <div className="section center">
        <div className="section-header">
          <h3>Just for you</h3>
        </div>

        <div className="event-cover">
          <div className="event-row">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                onClick={() => handleEventClick(event)} // ⭐ CHANGE
              />
            ))}
          </div>
          <div>
            <p>View all</p>
          </div>
        </div>
      </div>

      {/* Trending events */}
      <div className="section center">
        <div className="section-header">
          <h3>Trending events</h3>
        </div>

        <div className="event-cover">
          <div className="event-row">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                onClick={() => handleEventClick(event)} // ⭐ CHANGE
              />
            ))}
          </div>
          <div>
            <p>View all</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
