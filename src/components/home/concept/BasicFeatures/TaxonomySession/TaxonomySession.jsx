import React, { useState, useEffect } from "react";
import AnimaliaFlow from "./tree/animaliaFlow"; 
import "./TaxonomySession.css";

const TaxonomySession = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  return (
    <>
      <section className="taxonomy-session">
        <h2 className="taxonomy-session-title">
          Animal Classification <span>– Evolutionary Framework</span>
        </h2>

        <p className="taxonomy-session-desc">
          The animal kingdom (<strong>Animalia</strong>) is scientifically
          classified based on tissue organization, body plans, and evolutionary
          relationships. This framework helps us understand how diverse animal
          groups are connected through evolution.
        </p>

        {/* EMBEDDED VIEW */}
        <div className="taxonomy-tree-box">
          {/* 1. The Interactive Open Button (Clickable) */}
          <div className="taxonomy-overlay-controls">
            <button 
              className="taxonomy-open-btn" 
              onClick={() => setIsFullScreen(true)}
            >
              <span>⤢</span> Open Interactive View
            </button>
          </div>
          
          {/* 2. The Static Preview Wrapper (NOT Clickable/Scrollable) */}
          <div className="taxonomy-static-wrapper">
             <AnimaliaFlow isEmbedded={true} />
          </div>
        </div>
      </section>

      {/* FULL SCREEN VIEW */}
      {isFullScreen && (
        <div className="taxonomy-fullscreen-wrapper">
          <header className="taxonomy-fullscreen-header">
            <button 
              className="taxonomy-back-btn" 
              onClick={() => setIsFullScreen(false)}
            >
              ← Back to Page
            </button>
            <span className="taxonomy-fullscreen-title">Evolutionary Framework</span>
          </header>
          
          <div className="taxonomy-fullscreen-content">
            <AnimaliaFlow isEmbedded={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaxonomySession;