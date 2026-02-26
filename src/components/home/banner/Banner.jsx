import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import CountUp from "../../shared/CountUp";

// Static data moved outside component to prevent re-creation on every render
const images = [
  "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1200&auto=format&fit=crop", // Snow Leopard
  "https://images.unsplash.com/photo-1616128417859-3a984dd35f02?q=80&w=1200&auto=format&fit=crop", // Shoebill Stork
  "https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1200&auto=format&fit=crop", // Mandrill
  "https://images.unsplash.com/photo-1527118732049-c88155f2107c?q=80&w=1200&auto=format&fit=crop", // Red Panda
  "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1200&auto=format&fit=crop", // Whale Shark
  "https://images.unsplash.com/photo-1454991727061-be514eae86f7?q=80&w=1200&auto=format&fit=crop", // Blue Whale
];

export default function ZoologyHero() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setImageLoaded(false);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (index + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [index]);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
    setImageLoaded(false);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setImageLoaded(false);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
    setImageLoaded(false);
  };



  return (
    <section className="banner-hero" aria-label="Zoology Learning Platform Hero Banner">
      <div className="banner-container">
        {/* LEFT CONTENT */}
        <div className="banner-left">

          <h1 className="banner-title">
            Learn Zoology
            <span className="banner-highlight"> the Smart Way</span>
          </h1>

          <p className="banner-desc">
            Build strong biological concepts using visual explanations,
            organism-based learning and exam-focused structure. Master animal
            classification, anatomy, and ecology with interactive lessons.
          </p>

          <div className="banner-ctas">
            <button className="banner-btn-primary" onClick={() => navigate('/zoohub')}>
              Explore Species
            </button>
            <button className="banner-btn-secondary" onClick={() => navigate('/anatomy')}>
              View Patterns
            </button>
          </div>

          {/* STATS SECTION WITH ANIMATION */}
          <div className="banner-stats">
            <div className="banner-stat-item">
              <span className="banner-stat-number">
                <CountUp end={200} duration={2000} />+
              </span>
              <span className="banner-stat-label">Species</span>
            </div>

            <div className="banner-stat-divider"></div>

            <div className="banner-stat-item">
              <span className="banner-stat-number">
                <CountUp end={100} duration={2000} />+
              </span>
              <span className="banner-stat-label">3D Models</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="banner-right">
          <div className="banner-slider">
            <div className="banner-image-wrapper">
              <img
                key={index}
                src={images[index]}
                alt="Rare species showcase"
                className={`banner-image ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`Failed to load image: ${images[index]}`);
                  setImageLoaded(true);
                }}
              />
            </div>

            {/* SLIDER NAVIGATION */}
            <button className="banner-nav banner-prev" onClick={prev} aria-label="Previous">‹</button>
            <button className="banner-nav banner-next" onClick={next} aria-label="Next">›</button>

            {/* INDICATORS */}
            <div className="banner-slider-indicators">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`banner-indicator ${i === index ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`View slide ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}