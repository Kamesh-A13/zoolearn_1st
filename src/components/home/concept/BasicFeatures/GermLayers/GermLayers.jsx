import React, { useState } from "react";
import "./GermLayers.css";

// Updated Data with specific definitions from the request
const LAYERS_INFO = {
  Ectoderm: { 
    color: "#93c5fd", 
    role: "Forms epidermis and nervous tissue" 
  },
  Mesoderm: { 
    color: "#fca5a5", 
    role: "Forms skeletal, muscular, connective tissue, and coelom" 
  },
  Endoderm: { 
    color: "#fcd34d", 
    role: "Forms vital organs and their linings" 
  },
  Mesoglea: { 
    color: "#e9d5ff", 
    role: "Undifferentiated jelly-like layer between Ectoderm and Endoderm" 
  },
  Cavity: { 
    color: "#fff", 
    role: "Digestive Cavity (Gut)" 
  }
};

const ANIMAL_TYPES = {
  Diploblastic: {
    description: "",
    middleLayer: "Mesoglea"
  },
  Triploblastic: {
    description: "",
    middleLayer: "Mesoderm"
  }
};

export default function GermLayers() {
  const [type, setType] = useState("Triploblastic");
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const isTriplo = type === "Triploblastic";
  const middleName = ANIMAL_TYPES[type].middleLayer;
  
  // Visibility Logic
  const isVisible = (name) => showAll || hovered === name || selected === name;

  // Dynamic Info Panel Text
  const activeTarget = hovered || selected;
  const activeTitle = activeTarget || `${type} Organization`;
  const activeDesc = activeTarget 
    ? LAYERS_INFO[activeTarget]?.role 
    : ANIMAL_TYPES[type].description;

  const handleLayerClick = (name) => {
    setSelected(prev => (prev === name ? null : name));
  };

  return (
    <div className="gl-germ-section">
      <div className="gl-germ-container">

        <div className="gl-germ-definitions-area">
          
          <div className="gl-def-card gl-main-def">
            <h3 className="gl-def-title">Germ Layers Overview</h3>
            <p className="gl-def-intro">Germ layers arise during embryo formation and differentiate into specific tissues:</p>
            <ul className="gl-def-list">
              <li>
                <span className="gl-dot gl-ecto"></span>
                <strong>Ectoderm:</strong> Forms epidermis and nervous tissue.
              </li>
              <li>
                <span className="gl-dot gl-meso"></span>
                <strong>Mesoderm:</strong> Forms skeletal, muscular, connective tissue, and coelom.
              </li>
              <li>
                <span className="gl-dot gl-endo"></span>
                <strong>Endoderm:</strong> Forms vital organs and their linings.
              </li>
            </ul>
          </div>

          <div className="gl-def-card gl-type-def">
            <h3 className="gl-def-title">Classification by Layers</h3>
            
            <div className="gl-type-block">
              <h4 className="gl-type-name gl-diplo">Diploblastic Animals</h4>
              <p>The gastrula has <strong>two layers</strong>: external ectoderm and internal endoderm, with an undifferentiated jelly-like layer (<strong>mesoglea</strong>) between them.</p>
            </div>
            
            <div className="gl-separator"></div>

            <div className="gl-type-block">
              <h4 className="gl-type-name gl-triplo">Triploblastic Animals</h4>
              <p>The gastrula has <strong>three germ layers</strong>: ectoderm, mesoderm, and endoderm.</p>
            </div>
          </div>

        </div>
        
        {/* --- SECTION 1: INTERACTIVE DIAGRAM --- */}
        <div className="gl-germ-visual-area">
          <div className="gl-header">
             
            {/* <div className="gl-title-underline"></div> */}
          </div>

          <div className="gl-controls-row">
            <div className="gl-toggle-container">
              <button 
                className={`gl-toggle-btn ${!isTriplo ? "gl-active" : ""}`}
                onClick={() => { setType("Diploblastic"); setSelected(null); }}
              >
                Diploblastic
              </button>
              <button 
                className={`gl-toggle-btn ${isTriplo ? "gl-active" : ""}`}
                onClick={() => { setType("Triploblastic"); setSelected(null); }}
              >
                Triploblastic
              </button>
            </div>

            <button 
              className={`gl-show-all-btn ${showAll ? "gl-active" : ""}`}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Hide Labels" : "Show Labels"}
            </button>
          </div>

          <div className="gl-diagram-card">
            <svg viewBox="0 0 500 350" className="gl-germ-svg">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{stopColor:'rgb(255,255,255)', stopOpacity:0.1}} />
                  <stop offset="100%" style={{stopColor:'rgb(0,0,0)', stopOpacity:0.1}} />
                </radialGradient>
              </defs>

              <g transform="translate(250, 175)">
                {/* 1. ECTODERM */}
                <LayerCircle 
                  r={120} 
                  className={`gl-ectoderm ${selected === "Ectoderm" ? "gl-selected-layer" : ""}`}
                  name="Ectoderm" 
                  setHovered={setHovered}
                  onClick={handleLayerClick}
                />
                <CellPattern r={112} count={28} />

                {/* 2. MIDDLE */}
                <LayerCircle 
                  r={85} 
                  className={`${isTriplo ? "gl-mesoderm" : "gl-mesoglea"} ${selected === middleName ? "gl-selected-layer" : ""}`}
                  name={middleName} 
                  setHovered={setHovered}
                  onClick={handleLayerClick}
                />
                {isTriplo && <CellPattern r={75} count={20} />}

                {/* 3. ENDODERM */}
                <LayerCircle 
                  r={55} 
                  className={`gl-endoderm ${selected === "Endoderm" ? "gl-selected-layer" : ""}`}
                  name="Endoderm" 
                  setHovered={setHovered}
                  onClick={handleLayerClick}
                />
                <CellPattern r={48} count={12} />

                {/* 4. CAVITY */}
                <circle cx="0" cy="0" r="25" className="gl-cavity" />
                <text x="0" y="5" textAnchor="middle" fontSize="10" fill="#999" style={{pointerEvents:'none'}}>GUT</text>
                <circle cx="0" cy="0" r="120" fill="url(#grad1)" pointerEvents="none" />
              </g>

              {/* LABELS */}
              <SmartLabel cx={250} cy={175} angle={-45} innerR={90} outerR={120} label="Ectoderm" side="right" onHover={setHovered} visible={isVisible("Ectoderm")} />
              <SmartLabel cx={250} cy={175} angle={10} innerR={60} outerR={85} label={middleName} side="right" onHover={setHovered} visible={isVisible(middleName)} />
              <SmartLabel cx={250} cy={175} angle={190} innerR={30} outerR={55} label="Endoderm" side="left" onHover={setHovered} visible={isVisible("Endoderm")} />
            </svg>

            {/* DYNAMIC INFO PANEL */}
            <div className="gl-info-panel">
              <div className="gl-info-title" style={{ color: LAYERS_INFO[activeTarget]?.color || '#333' }}>
                {activeTitle}
              </div>
              <div className="gl-info-desc">{activeDesc}</div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: DETAILED DEFINITIONS (The Content Upgrade) --- */}
        

      </div>
    </div>
  );
}

// --- SUBCOMPONENTS (Unchanged Logic) ---

function LayerCircle({ r, className, name, setHovered, onClick }) {
  return (
    <circle
      r={r}
      className={`gl-layer ${className}`}
      onMouseEnter={() => setHovered(name)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onClick(name)}
    />
  );
}

function CellPattern({ r, count }) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return <circle key={i} cx={r * Math.cos(angle)} cy={r * Math.sin(angle)} r={2.5} className="gl-cell-dot" />;
  });
}

function SmartLabel({ cx, cy, angle, innerR, outerR, label, side, onHover, visible }) {
  const rad = (angle * Math.PI) / 180;
  const startR = innerR + (outerR - innerR) / 2;
  const x1 = cx + startR * Math.cos(rad);
  const y1 = cy + startR * Math.sin(rad);
  const elbowR = 140;
  const x2 = cx + elbowR * Math.cos(rad);
  const y2 = cy + elbowR * Math.sin(rad);
  const extension = 40;
  const x3 = side === "right" ? x2 + extension : x2 - extension;
  const y3 = y2;

  return (
    <g className={`gl-annotation-group ${visible ? "gl-visible" : ""}`} onMouseEnter={() => onHover(label)} onMouseLeave={() => onHover(null)}>
      <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} className="gl-annotation-line" />
      <circle cx={x1} cy={y1} r="3" className="gl-annotation-dot" />
      <text x={side === "right" ? x3 + 8 : x3 - 8} y={y3} textAnchor={side === "right" ? "start" : "end"} className="gl-annotation-text">{label}</text>
    </g>
  );
}