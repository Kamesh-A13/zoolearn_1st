import React, { useState } from "react";
import "./LeechAnotomyInteractive.css";

const LEECH_IMAGE_URL =
  "https://res.cloudinary.com/duibfmcw1/image/upload/v1767857642/WhatsApp_Image_2026-01-08_at_1.01.51_PM_cyqlkw.jpg";

// Data: 33 Segments
const segmentDefs = Array.from({ length: 33 }, (_, i) => {
  const top = (i / 33) * 100;
  const height = 100 / 33;
  return { id: i + 1, top, height };
});

// Data: Region Info with EdTech-friendly Colors
const regionInfo = {
  "1-5": {
    title: "Anterior Sucker & Cephalic",
    desc: "Segments 1–5. The 'Head' of the leech. Contains eyes for light detection and the sucker for holding on tight.",
    color: "#e11d48", // Vivid Pink-Red
    icon: "👁️",
    badge: "Sensory Zone"
  },
  "6-8": {
    title: "Pre-clitellar Region",
    desc: "Segments 6–8. A transition zone containing the pharynx. Think of this as the throat area.",
    color: "#f59e0b", // Amber
    icon: "🔄",
    badge: "Transition"
  },
  "9-11": {
    title: "Clitellar Region",
    desc: "Segments 9–11. The 'Factory'. This glandular region creates the cocoon for reproduction.",
    color: "#ea580c", // Orange
    icon: "🥚",
    badge: "Reproduction"
  },
  "12-22": {
    title: "Middle Body Region",
    desc: "Segments 12–22. The largest section. It houses the main organs like the crop and intestine.",
    color: "#16a34a", // Green
    icon: "🧬",
    badge: "Digestion"
  },
  "23-26": {
    title: "Posterior Body Region",
    desc: "Segments 23–26. The end of the digestive tract, containing the rectum and anus.",
    color: "#0d9488", // Teal
    icon: "🍑",
    badge: "Excretion"
  },
  "27-33": {
    title: "Posterior Sucker",
    desc: "Segments 27–33. The anchor. A powerful suction cup used for movement and staying put.",
    color: "#4f46e5", // Indigo
    icon: "⚓",
    badge: "Locomotion"
  },
};

function getRegion(segmentId) {
  if (!segmentId) return null;
  if (segmentId <= 5) return "1-5";
  if (segmentId <= 8) return "6-8";
  if (segmentId <= 11) return "9-11";
  if (segmentId <= 22) return "12-22";
  if (segmentId <= 26) return "23-26";
  return "27-33";
}

export default function LeechAnatomyInteractive() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const activeId = hoveredSegment || selectedSegment;
  const activeRegionKey = getRegion(activeId);
  const info = activeRegionKey ? regionInfo[activeRegionKey] : null;

  const handleToggle = (id) => {
    setSelectedSegment((prev) => (prev === id ? null : id));
  };

  return (
    <div className="leech-container">
      
      {/* Header */}
      <header className="leech-header">
        <div className="leech-badge-pill">Interactive Biology</div>
        <h1>Leech Anatomy</h1>
        <p>Explore the 33 segments of the <strong>Hirudinaria granulosa</strong></p>
      </header>

      <div className="leech-grid">
        
        {/* LEFT: Interactive Visual */}
        <div className="leech-visual-panel">
          <div className="leech-visual-stage">
            
            {/* Ruler */}
            <div className="leech-ruler">
              {segmentDefs.map((seg) => (
                <div
                  key={`ruler-${seg.id}`}
                  className={`leech-tick ${activeId === seg.id ? "active" : ""}`}
                  style={{ top: `${seg.top}%`, height: `${seg.height}%` }}
                >
                  {(seg.id === 1 || seg.id === 33 || seg.id % 5 === 0) && (
                    <span className="leech-tick-num">{seg.id}</span>
                  )}
                  {/* Small ticks for every segment */}
                  <span className="leech-tick-mark"></span>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="leech-image-wrapper">
              <img src={LEECH_IMAGE_URL} alt="Leech Diagram" />
              
              <div className="leech-overlays-container">
                {segmentDefs.map((seg) => {
                  const isExact = activeId === seg.id;
                  const isRegion = activeId && getRegion(activeId) === getRegion(seg.id);
                  const isLocked = selectedSegment === seg.id;

                  return (
                    <div
                      key={seg.id}
                      className={`leech-segment-hitbox 
                        ${isExact ? "exact" : ""} 
                        ${isRegion ? "region" : ""}
                        ${isLocked ? "locked" : ""}
                      `}
                      style={{
                        top: `${seg.top}%`,
                        height: `${seg.height}%`,
                      }}
                      onMouseEnter={() => setHoveredSegment(seg.id)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      onClick={() => handleToggle(seg.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="leech-instruction">
            <span className="icon">👆</span> Tap segments to lock details
          </div>
        </div>

        {/* RIGHT: Educational Card */}
        <div className="leech-info-panel">
          <div className={`leech-learn-card ${info ? "active" : "idle"}`}>
            {info ? (
              <>
                <div className="leech-card-hero" style={{ background: info.color }}>
                  <div className="leech-card-icon-circle">{info.icon}</div>
                  <div className="leech-card-badges">
                    <span className="badge-translucent">{info.badge}</span>
                    <span className="badge-white">Segs {activeRegionKey}</span>
                  </div>
                </div>
                
                <div className="leech-card-body">
                  <h3>{info.title}</h3>
                  <p>{info.desc}</p>
                  
                  <div className="leech-stats-grid">
                    <div className="leech-stat-box">
                      <label>Focus</label>
                      <div className="value">Segment {activeId}</div>
                    </div>
                    <div className="leech-stat-box">
                      <label>State</label>
                      <div className="value status">
                        {selectedSegment ? "Locked 🔒" : "Previewing 👀"}
                      </div>
                    </div>
                  </div>

                  {selectedSegment && (
                    <button className="leech-btn-reset" onClick={() => setSelectedSegment(null)}>
                      Unlock Selection
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="leech-idle-state">
                <div className="leech-idle-graphic">🧬</div>
                <h3>Ready to Learn?</h3>
                <p>Hover over the diagram to identify functional regions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}