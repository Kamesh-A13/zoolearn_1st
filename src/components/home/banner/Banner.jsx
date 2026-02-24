import { useEffect, useState } from "react";
import "./Banner.css";
import CountUp from "../../shared/CountUp";

// Static data moved outside component to prevent re-creation on every render
const images = [
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Lion
  "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Elephant
  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Wolf
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Bird
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"  // Gorilla
];

const animalNames = ["African Lion", "African Elephant", "Gray Wolf", "Macaw Parrot", "Mountain Gorilla"];

export default function ZoologyHero() {

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
                alt={`${animalNames[index]} - Animal classification and anatomy`}
                className={`banner-image ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`Failed to load image: ${images[index]}`);
                  setImageLoaded(true);
                }}
              />

              <div className="banner-image-caption" style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: '500',
                textAlign: 'center',
                backdropFilter: 'blur(4px)'
              }}>
                {animalNames[index]} - Study anatomy, behavior, and habitat
              </div>
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