import React from "react";
import "./TaxonomySystematics.css";

function TaxonomySystematics() {
  return (
    <section className="ts-section">
      <div className="ts-container">

        {/* HEADER */}
        <header className="ts-header">
          <h2 className="ts-section-title">Taxonomy &amp; Systematics</h2>
          {/* <div className="ts-title-underline"></div> */}
        </header>

        {/* COMPARISON CARDS (Grid Layout) */}
        <div className="ts-concept-grid">

          {/* Card 1: Taxonomy */}
          <div className="ts-concept-card ts-card-taxonomy">
            <div className="ts-card-icon"><img src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767850326/taxonomy_oqcngx.png" alt="Taxonomy Icon"></img></div>
            <h3>Taxonomy</h3>
            <p>
              The scientific process of <strong>identifying, naming, and classifying</strong> organisms.
            </p>
          </div>

          {/* Card 2: Systematics */}
          <div className="ts-concept-card ts-card-systematics">
            <div className="ts-card-icon"><img src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767780954/006-dna_wrm2wd.png"   alt="Systematics Illustration" style={{ filter: 'hue-rotate(260deg)' }}></img></div>
            <h3>Systematics</h3>
            <p>
              Involves classification along with the study of <strong>evolutionary relationships</strong>.
            </p>
          </div>
        </div>

        {/* CLASSIFICATION PILLS */}
        <div className="ts-aspects-section">
          <p className="ts-purpose-line">
            Classification helps biologists predict:
          </p>

          <div className="ts-pill-grid">
            <span className="ts-pill" style={{ "--delay": "0.1s" }}>Structure</span>
            <span className="ts-pill" style={{ "--delay": "0.2s" }}>Behavior</span>
            <span className="ts-pill" style={{ "--delay": "0.3s" }}>Biochemistry</span>
            <span className="ts-pill" style={{ "--delay": "0.4s" }}>Evolutionary History</span>
            <span className="ts-pill" style={{ "--delay": "0.5s" }}>Similarities & Differences</span>
          </div>
        </div>

        {/* KEY TAKEAWAY (Animated Footer) */}
        <div className="ts-summary-banner">
          <div className="ts-summary-content">
            <span className="ts-highlight-green">Taxonomy</span> tells <em>“who it is,”</em> while{" "}
            <span className="ts-highlight-purple">Systematics</span> explains <em>“how it is related.”</em>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TaxonomySystematics;