import { useRef, useState, useEffect } from "react";
import scientists from "./scientists.json";
import "./ScientistCarousel.css";

export default function ScientistCarousel() {
  const carouselRef = useRef(null);
  const sortRef = useRef(null);
  const hasUserInteracted = useRef(false);

  const fields = [...new Set(scientists.map(s => s.field))];

  const [filter, setFilter] = useState(fields[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const filtered = scientists.filter(s => s.field === filter);

  useEffect(() => {
    setActiveIndex(0);
    setFlippedIndex(null);
    if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0 });
    }
  }, [filter]);

  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index];
    if (!card) return;

    if (hasUserInteracted.current) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }

    setActiveIndex(index);
    setFlippedIndex(null);
  };

  const handlePrev = () => {
    hasUserInteracted.current = true;
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    hasUserInteracted.current = true;
    scrollToIndex(Math.min(activeIndex + 1, filtered.length - 1));
  };

  const toggleFlip = (index) => {
    setFlippedIndex(prev => (prev === index ? null : index));
  };

  const slideSort = (direction) => {
    if (sortRef.current) {
      // Increased scroll amount for wider view
      const scrollAmount = 300; 
      sortRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="sci-scientist-section">

      {/* HEADING */}
      <div className="sci-section-header">
        <h2>Legendary Scientists</h2>
        <p>Explore the minds that shaped our understanding of the world.</p>
      </div>

      {/* SORTING */}
      <div className="sci-sort-bar-wrapper">
        <button 
          className="sci-sort-nav-btn sci-left" 
          onClick={() => slideSort("left")}
          aria-label="Scroll categories left"
        >
          ‹
        </button>

        <div className="sci-sort-scroll" ref={sortRef}>
          {fields.map((field) => (
            <button
              key={field}
              className={`sci-sort-btn ${filter === field ? "sci-active" : ""}`}
              onClick={() => {
                hasUserInteracted.current = true;
                setFilter(field);
              }}
            >
              {field}
            </button>
          ))}
        </div>

        <button 
          className="sci-sort-nav-btn sci-right" 
          onClick={() => slideSort("right")}
          aria-label="Scroll categories right"
        >
          ›
        </button>
      </div>

      {/* CAROUSEL */}
      <div className="sci-carousel-shell">

        <button className="sci-nav-btn" onClick={handlePrev}>
          ‹
        </button>

        <div className="sci-snap-carousel" ref={carouselRef}>
          {filtered.map((sci, i) => (
            <div
              key={sci.id}
              className={`sci-snap-card ${i === activeIndex ? "sci-active" : ""}`}
              onClick={() => {
                hasUserInteracted.current = true;
                scrollToIndex(i);
              }}
            >
              <div
                className={`sci-flip-card ${flippedIndex === i ? "sci-is-flipped" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlip(i);
                }}
              >
                <div className="sci-flip-inner">

                  {/* FRONT */}
                  <div className="sci-flip-front">
                    <div className="sci-image-box">
                      <img src={sci.image} alt={sci.name} />
                    </div>

                    <div className="sci-card-info">
                      <h3>{sci.name}</h3>
                      <p className="sci-period">{sci.period}</p>
                      <span className="sci-badge">{sci.field}</span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="sci-flip-back">
                    <h3>{sci.name}</h3>
                    <div className="sci-details">
                      <p>{sci.details}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="sci-nav-btn" onClick={handleNext}>
          ›
        </button>

      </div>
    </section>
  );
}