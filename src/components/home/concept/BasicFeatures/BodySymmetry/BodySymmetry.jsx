import React, { memo, useState } from "react";
import PropTypes from 'prop-types';
import "./BodySymmetry.css";

// Importing the local image as per your file structure
import localSymmetryImg from "./BodySymmetry.png"; 

// Fallback image in case the local file isn't loaded
const FALLBACK_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Symmetry_biology.svg/1200px-Symmetry_biology.svg.png";

const CONTENT_DATA = [
  {
    id: "asym",
    title: "Asymmetrical",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768923661/photo_2026-01-20_21-10-00_bwjz9j.jpg", // Replace with your actual image links
    description: "The body cannot be divided into two similar parts from any plane or direction.",
    extra: "Common in sponges."
  },
  {
    id: "radial",
    title: "Radial Symmetry",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768923706/photo_2026-01-20_21-11-08_l4gpsx.jpg",
    description: "A plane passing through the central axis divides it into two equal halves.",
    extra: "Advantageous for gathering food from all sides."
  },
  {
    id: "bilateral",
    title: "Bilateral Symmetry",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768923742/photo_2026-01-20_21-11-23_icpxvr.jpg",
    description: "The body can be divided into identical left and right halves in only one plane.",
    extra: "Leads to cephalization (development of a head)."
  }
];

/**
 * Note Component for Cephalization
 */
const EvolutionNote = memo(() => (
  <div className="bs-note-wrapper">
    <div className="bs-note-header">
      <span className="bs-icon">💡</span>
      <span className="bs-note-label">Evolutionary Note</span>
    </div>
    <div className="bs-note-body">
      <p>
        Bilateral symmetry evolved when animals on the ocean floor became mobile. 
        The end that encounters food first developed the mouth, along with sensory organs 
        and a coordinating brain—this is called <strong>cephalization</strong>.
      </p>
    </div>
  </div>
));
EvolutionNote.displayName = "EvolutionNote";

/**
 * Main Component
 */
const BodySymmetry = ({ title = "Body Symmetry", contentData = CONTENT_DATA }) => {
  // NEW: State to track which card is currently flipped
  const [flippedCardId, setFlippedCardId] = useState(null);

  const toggleFlip = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  return (
    <section className="bs-section">
      <div className="bs-container">
        
        {/* HEADER - Kept exactly as it was */}
        <header className="bs-header">
          <h2 id="body-symmetry-title" className="bs-title">{title}</h2>
          <div className="bs-underline" aria-hidden="true"></div>
        </header>

        {/* UPDATED CONTENT GRID */}
        <div className="bs-content-grid">
          {contentData.map((item) => (
            <div 
              key={item.id} 
              className="bs-flip-card"
              onClick={() => toggleFlip(item.id)} /* Tap to flip */
            >
              <div className={`bs-card-inner ${flippedCardId === item.id ? 'is-flipped' : ''}`}>
                
                {/* FRONT SIDE (Image) */}
                <div className="bs-card-front">
                  <img 
                    src={item.img || "https://res.cloudinary.com/duibfmcw1/image/upload/v1767626750/BodySymmetry_af1lgn.png"} 
                    alt={item.title} 
                    className="bs-card-img" 
                  />
                  <div className="bs-card-label">{item.title}</div>
                </div>

                {/* BACK SIDE (Text Content) */}
                <div className="bs-card-back">
                  <h3 className="bs-card-title">{item.title}</h3>
                  <div className="bs-card-body">
                    <p className="bs-text">{item.description}</p>
                    {item.extra && (
                      <div className="bs-extra-info">
                        <strong>Significance:</strong> {item.extra}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ... Rest of footer note ... */}
      </div>
    </section>
  );
};

BodySymmetry.propTypes = {
  title: PropTypes.string,
  contentData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      extra: PropTypes.string
    })
  ),
  showEvolutionNote: PropTypes.bool,
  className: PropTypes.string
};

BodySymmetry.defaultProps = {
  title: "Body Symmetry",
  contentData: CONTENT_DATA,
  showEvolutionNote: true,
  className: ""
};

export default memo(BodySymmetry);