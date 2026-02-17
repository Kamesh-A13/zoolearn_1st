import "./circulatorySystem.css";

const CirculatorySystem = () => {
  return (
    <section className="circ-section">
      <div className="circ-container">

        {/* HEADER */}
        <div className="circ-header">
          <h2 className="circ-title">Circulatory System</h2>
        </div>

        <div className="circ-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="circ-content">

            {/* INTRO BOX */}
            <div className="circ-card circ-intro-card">
              <div className="circ-card-accent"></div>
              <h3 className="circ-card-heading">Haemocoelic System</h3>
              <p className="circ-card-text">
                The circulatory system of the leech is classified as a <strong>haemocoelic system</strong>.
                The true coelom is <strong>greatly reduced</strong> and filled with botryoidal tissue.
                Blood flows through spaces (sinuses) called <strong>haemocoelic channels</strong>
                rather than through enclosed blood vessels.
              </p>
            </div>

            {/* KEY FEATURE */}
            <div className="circ-card circ-highlight-card">
              <div className="circ-icon-circle">🚫</div>
              <div>
                <h4 className="circ-highlight-title">No True Blood Vessels</h4>
                <p className="circ-card-text" style={{ margin: 0 }}>
                  Unlike the closed circulatory system of earthworms, the leech has <strong>no defined
                    arteries, veins, or capillaries</strong>. Blood flows freely through open longitudinal channels.
                </p>
              </div>
            </div>

            {/* CHANNELS */}
            <div className="circ-card circ-channels-card">
              <h3 className="circ-card-heading">Four Longitudinal Channels</h3>
              <p className="circ-card-text">
                Blood flows through four main haemocoelic channels that run the length of the body:
              </p>

              <div className="circ-channels-list">

                <div className="circ-channel-item">
                  <span className="circ-channel-num">1</span>
                  <div>
                    <strong className="circ-channel-name">Dorsal Channel</strong>
                    <p className="circ-channel-desc">Single channel running along the dorsal surface; carries blood anteriorly</p>
                  </div>
                </div>

                <div className="circ-channel-item">
                  <span className="circ-channel-num">2</span>
                  <div>
                    <strong className="circ-channel-name">Ventral Channel</strong>
                    <p className="circ-channel-desc">Single channel running along the ventral surface; contains the ventral nerve cord</p>
                  </div>
                </div>

                <div className="circ-channel-item circ-heart-item">
                  <span className="circ-channel-heart">❤️</span>
                  <div>
                    <strong className="circ-channel-name">Two Lateral Channels</strong>
                    <p className="circ-channel-desc">
                      One on each side of the body. These are <strong>contractile</strong> and
                      act as <strong>hearts</strong> — rhythmically pulsating to drive blood circulation.
                    </p>
                    <span className="circ-pulse-badge">Functionally act as hearts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONNECTION */}
            <div className="circ-card circ-connection-card">
              <div className="circ-icon-circle">🔗</div>
              <div>
                <h4 className="circ-highlight-title">Posterior Connection</h4>
                <p className="circ-card-text" style={{ margin: 0 }}>
                  All four channels <strong>unite posteriorly in the 26th segment</strong>,
                  forming a network of sinuses around the posterior sucker. This ensures continuous circulation.
                </p>
              </div>
            </div>

            {/* REMEMBER */}
            <div className="leech-callout leech-callout-info">
              <strong>📝 Remember</strong>
              The leech has a <em>haemocoelic</em> system (blood in body sinuses), NOT a blood vascular
              system (blood in vessels). Haemoglobin is dissolved freely in the haemocoelic fluid —
              not contained in RBCs.
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="circ-image-col">
            <div className="circ-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810701/circulatorysystem_chgajt.png"
                alt="Circulatory System of Leech"
                className="circ-img"
              />
              <span className="circ-img-caption">Figure: Haemocoelic Channels</span>
            </div>

            {/* Summary */}
            <div className="circ-summary-card">
              <h4 className="circ-summary-title">At a Glance</h4>
              <div className="circ-summary-row">
                <span className="circ-summary-label">Type</span>
                <span className="circ-summary-value">Haemocoelic (open)</span>
              </div>
              <div className="circ-summary-row">
                <span className="circ-summary-label">Channels</span>
                <span className="circ-summary-value">4 longitudinal</span>
              </div>
              <div className="circ-summary-row">
                <span className="circ-summary-label">Hearts</span>
                <span className="circ-summary-value">2 lateral channels</span>
              </div>
              <div className="circ-summary-row">
                <span className="circ-summary-label">Pigment</span>
                <span className="circ-summary-value">Haemoglobin (free)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CirculatorySystem;