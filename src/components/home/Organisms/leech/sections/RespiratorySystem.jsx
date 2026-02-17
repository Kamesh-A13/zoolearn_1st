import "./respiratorySystem.css";

const RespiratorySystem = () => {
  return (
    <section className="resp-section">
      <div className="resp-container">

        {/* HEADER */}
        <div className="resp-header">
          <h2 className="resp-title">Respiratory System</h2>
        </div>

        <div className="resp-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="resp-content">

            {/* CARD 1: INTRO */}
            <div className="resp-card resp-intro-card">
              <div className="resp-card-accent"></div>
              <h3 className="resp-card-heading">No Specialised Respiratory Organs</h3>
              <p className="resp-card-text">
                Unlike vertebrates (lungs) or fish (gills), the leech possesses <strong>no specialised
                  respiratory organs</strong>. Instead, gas exchange occurs entirely through the <strong>moist skin surface</strong>.
              </p>
              <div className="resp-keyword">
                <span className="resp-keyword-tag">Key Term</span>
                <span className="resp-keyword-text">Cutaneous Respiration — respiration through the skin</span>
              </div>
            </div>

            {/* CARD 2: MECHANISM */}
            <div className="resp-card resp-mechanism-card">
              <div className="resp-icon-wrapper">🌬️</div>
              <div className="resp-info-col">
                <h3 className="resp-card-heading">Mechanism of Gas Exchange</h3>
                <p className="resp-card-text">
                  Oxygen dissolved in the surrounding water <strong>diffuses directly through the thin,
                    moist skin</strong> into the underlying haemocoelic fluid. The skin is kept permanently
                  moist and slimy by <strong>mucus glands</strong> in the epidermis, ensuring continuous gas exchange.
                </p>
                <ul className="leech-section-list">
                  <li><strong>O₂ path:</strong> Water → Skin → Haemocoelic fluid → Body cells</li>
                  <li><strong>CO₂ path:</strong> Body cells → Haemocoelic fluid → Skin → Water</li>
                </ul>
              </div>
            </div>

            {/* CARD 3: TRANSPORT */}
            <div className="resp-card resp-transport-card">
              <div className="resp-icon-wrapper">🩸</div>
              <div className="resp-info-col">
                <h3 className="resp-card-heading">Gas Transport</h3>
                <p className="resp-card-text">
                  <strong>Haemoglobin</strong> — the same respiratory pigment found in human blood — is dissolved
                  directly in the haemocoelic fluid (not inside red blood cells). It binds oxygen and transports
                  it to all body tissues.
                </p>
                <div className="resp-highlight-badge">CO₂ diffuses out through the skin surface</div>
              </div>
            </div>

            {/* COMPARISON */}
            <div className="leech-callout leech-callout-info">
              <strong>🔬 Quick Comparison</strong>
              Unlike fish that use gills for aquatic respiration or earthworms that also use cutaneous respiration,
              the leech's haemocoelic system means the respiratory pigment floats <em>freely</em> in the body fluid
              rather than being contained in blood vessels — making gas exchange uniquely direct.
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="resp-image-col">
            <div className="resp-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810794/leech_imk2bj.jpg"
                alt="Leech Cutaneous Respiration"
                className="resp-img"
              />
              <span className="resp-img-caption">Figure: Cutaneous Respiration</span>
            </div>

            {/* Summary Card */}
            <div className="resp-summary-card">
              <h4 className="resp-summary-title">At a Glance</h4>
              <div className="resp-summary-row">
                <span className="resp-summary-label">Organ</span>
                <span className="resp-summary-value">Skin (no lungs/gills)</span>
              </div>
              <div className="resp-summary-row">
                <span className="resp-summary-label">Process</span>
                <span className="resp-summary-value">Diffusion</span>
              </div>
              <div className="resp-summary-row">
                <span className="resp-summary-label">Pigment</span>
                <span className="resp-summary-value">Haemoglobin (dissolved)</span>
              </div>
              <div className="resp-summary-row">
                <span className="resp-summary-label">Medium</span>
                <span className="resp-summary-value">Haemocoelic fluid</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RespiratorySystem;