import React, { useState } from "react";
import kingdomsData from "./data/kingdomData";
import "./KingdomChart.css";

/* ---------- Math Utilities ---------- */
const polarToCartesian = (cx, cy, r, angle) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
};

const describeArc = (cx, cy, r, start, end) => {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y} Z`;
};

const describeTextPath = (cx, cy, r, start, end) => {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = end - start <= 180 ? "0" : "1";
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y}`;
};

export default function KingdomChart() {
  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  /* ---------- Configuration ---------- */
  const size = 600; 
  const center = size / 2;
  const radius = size * 0.48; 
  const innerRadius = size * 0.18; 
  const textRadius = radius * 0.82; 
  const iconRadius = radius * 0.55; 
  const iconSize = 50; // Width and height of your images
  
  const sliceAngle = 360 / kingdomsData.length;

  const currentData =
    kingdomsData.find(k => k.id === activeId) ||
    kingdomsData.find(k => k.id === hoverId);

  return (
    <div className="kc-kingdom-container">
      
      {/* LEFT: CHART */}
      <div className="kc-chart-wrapper">
        <div className="kc-chart-responsive">
          <svg viewBox={`0 0 ${size} ${size}`} className="kc-chart-svg">
            <defs>
              {kingdomsData.map((k, i) => (
                <path
                  key={`path-${k.id}`}
                  id={`curve-${k.id}`}
                  d={describeTextPath(
                    center,
                    center,
                    textRadius,
                    i * sliceAngle,
                    (i + 1) * sliceAngle
                  )}
                />
              ))}
            </defs>

            {/* Slices */}
            {kingdomsData.map((k, i) => {
              const start = i * sliceAngle;
              const end = (i + 1) * sliceAngle;
              const mid = start + sliceAngle / 2;
              
              const isActive = activeId === k.id;
              const isHover = hoverId === k.id;
              const isDimmed = (activeId && !isActive) || (hoverId && !isHover && !activeId);

              const iconPos = polarToCartesian(center, center, iconRadius, mid);

              return (
                <g
                  key={k.id}
                  className={`kc-slice-group ${isActive ? "kc-active" : ""} ${isDimmed ? "kc-dimmed" : ""}`}
                  onClick={() => setActiveId(isActive ? null : k.id)}
                  onMouseEnter={() => setHoverId(k.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    className="kc-slice-path"
                    d={describeArc(center, center, radius, start, end)}
                    fill={k.color}
                    stroke="#ffffff"
                    strokeWidth={isActive ? 6 : 2}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Label on Curve */}
                  <text className="kc-slice-label" dy="-10" style={{ fill: '#fff', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
                    <textPath 
                      href={`#curve-${k.id}`} 
                      startOffset="50%" 
                      textAnchor="middle"
                    >
                      {k.label}
                    </textPath>
                  </text>

                  {/* ICON AS IMAGE */}
                  <image
                    href={k.icon} 
                    x={iconPos.x - iconSize / 2}
                    y={iconPos.y - iconSize / 2}
                    height={iconSize}
                    width={iconSize}
                    style={{ 
                      pointerEvents: 'none',
                      transition: 'transform 0.3s ease',
                      transformOrigin: `${iconPos.x}px ${iconPos.y}px`,
                      transform: isHover || isActive ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                </g>
              );
            })}

            {/* Center Hub */}
            <circle cx={center} cy={center} r={innerRadius} className="kc-hub-bg" fill="#fff" />
            <text x={center} y={center - 5} textAnchor="middle" className="kc-hub-count" style={{ fontSize: '2rem', fontWeight: 'bold', fill: '#334155' }}>
              {kingdomsData.length}
            </text>
            <text x={center} y={center + 20} textAnchor="middle" className="kc-hub-label" style={{ fontSize: '0.8rem', fontWeight: '600', fill: '#64748b', letterSpacing: '1px' }}>
              KINGDOMS
            </text>
          </svg>
        </div>
      </div>

      {/* RIGHT: CONTENT CARD */}
      <div className="kc-card-wrapper">
        {currentData ? (
          <div className="kc-glass-card">
            <div className="kc-card-header">
              {/* Card Header Image */}
              <div className="kc-card-bg-icon">
                <img src={currentData.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.2 }} />
              </div>
              
              <span className="kc-badge">{activeId ? "Selected" : "Preview"}</span>
              <h2 className="kc-title" style={{ color: currentData.color }}>
                {currentData.title}
              </h2>
              <p className="kc-subtitle">"{currentData.short}"</p>
            </div>

            <div className="kc-card-body">
              <div className="kc-section-head">Key Characteristics</div>
              <ul className="kc-char-list">
                {currentData.details
                  .split("Examples:")[0]
                  .split("\n")
                  .filter(line => line.includes("•"))
                  .map((line, idx) => (
                    <li key={idx} className="kc-char-item">
                      <span className="kc-bullet" style={{ background: currentData.color }} />
                      {line.replace("•", "").trim()}
                    </li>
                  ))}
              </ul>

              <div className="kc-section-head">Common Examples</div>
              <div className="kc-tags-group">
                {currentData.details.includes("Examples:") ? (
                  currentData.details
                    .split("Examples:")[1]
                    .split(",")
                    .map((ex, idx) => (
                      <span key={idx} className="kc-tag" style={{ borderLeft: `3px solid ${currentData.color}` }}>
                        {ex.trim()}
                      </span>
                    ))
                ) : (
                  <span className="kc-tag">...</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="kc-glass-card kc-empty-box">
            <div className="kc-empty-icon">🖱️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#64748b' }}>
              Explore Taxonomy
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8' }}>Hover or click a kingdom to see details.</p>
            
          </div>
        )}
      </div>

    </div>
  );
}