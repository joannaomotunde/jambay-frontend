import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenLayout from "../layout/ScreenLayout"; // Correct path to match your folder
import '../App.css';
import vectorLogo from '../assets/images/vector.png'
import frame15 from '../assets/images/Frame 15.png'

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
  <img src={vectorLogo} alt="Jambay" className="onboarding-logo" />
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
<img
  src={frame15}
  alt="Get Started"
  className="onboarding-button"
  onClick={handleNext}
  style={{ cursor: 'pointer' }}
/>

        </div>
      </div>
    </ScreenLayout>
  );
}

export default Onboarding;