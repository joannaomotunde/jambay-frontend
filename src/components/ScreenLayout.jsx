import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ScreenLayout = ({ title, subtitle, children, backTo = "/" }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="screen-wrapper">
        {/* Back button */}
        <button className="back-button" onClick={() => navigate(backTo)}>
          ‹
        </button>

        {/* Page Title */}
        {title && <h2 className="auth-title">{title}</h2>}

        {/* Page Subtitle */}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}

        {/* Main content */}
        {children}
      </div>
    </div>
  );
};

export default ScreenLayout;