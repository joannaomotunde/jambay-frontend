import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenLayout from "../layout/ScreenLayout"; // Correct path to match your folder
import '../App.css';

function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { className: 'onboarding-slide-1' },
    { className: 'onboarding-slide-2' },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <ScreenLayout>
      <div className={`onboarding-container ${slides[currentSlide].className}`}>

        {/* Logo area */}
        <div className="onboarding-logo-area">
          {/* Logo will go here */}
        </div>

        {/* Bottom section */}
        <div className="onboarding-bottom">

          {/* Dot indicators */}
          <div className="onboarding-dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`onboarding-dot ${index === currentSlide ? 'active' : 'inactive'}`}
              />
            ))}
          </div>

          {/* Get Started button */}
          <button className="onboarding-button" onClick={handleNext}>
            Get Started <span>›</span>
          </button>

        </div>
      </div>
    </ScreenLayout>
  );
}

export default Onboarding;