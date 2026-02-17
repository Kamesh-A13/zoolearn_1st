import "./nervousSystem.css";

const NervousSystem = () => {
  return (
    <section className="nerv-section">
      <div className="nerv-container">

        {/* HEADER */}
        <div className="nerv-header">
          <h2 className="nerv-title">Nervous System</h2>
        </div>

        <div className="nerv-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="nerv-content">

            {/* INTRO */}
            <div className="nerv-card">
              <div className="nerv-card-accent"></div>
              <h3 className="nerv-card-heading">Organisation</h3>
              <p className="nerv-card-text">
                The nervous system of the leech follows the typical annelid plan — a <strong>dorsal brain</strong>
                connected to a <strong>ventral nerve cord</strong> with segmental ganglia. It coordinates
                locomotion, feeding, and sensory responses.
              </p>
            </div>

            {/* COMPONENTS */}
            <div className="nerv-card">
              <h3 className="nerv-card-heading">Components</h3>

              <div className="nerv-component-list">

                <div className="nerv-component">
                  <div className="nerv-comp-icon">🧠</div>
                  <div>
                    <strong className="nerv-comp-name">Cerebral Ganglia (Brain)</strong>
                    <p className="nerv-comp-desc">
                      A pair of supra-oesophageal ganglia located above the pharynx in the 5th/6th segment.
                      Connected by a nerve ring that encircles the oesophagus. Controls higher functions.
                    </p>
                  </div>
                </div>

                <div className="nerv-comp-connector">│</div>

                <div className="nerv-component">
                  <div className="nerv-comp-icon">🔗</div>
                  <div>
                    <strong className="nerv-comp-name">Circum-pharyngeal Connectives</strong>
                    <p className="nerv-comp-desc">
                      Two connective cords loop around the pharynx, joining the brain to the
                      sub-oesophageal ganglion. This forms the <strong>nerve ring</strong>.
                    </p>
                  </div>
                </div>

                <div className="nerv-comp-connector">│</div>

                <div className="nerv-component">
                  <div className="nerv-comp-icon">⛓️</div>
                  <div>
                    <strong className="nerv-comp-name">Ventral Nerve Cord</strong>
                    <p className="nerv-comp-desc">
                      Runs along the ventral surface within the ventral haemocoelic channel.
                      Contains <strong>21 segmental ganglia</strong>, each sending out paired nerves
                      to muscles and organs of that segment.
                    </p>
                  </div>
                </div>

                <div className="nerv-comp-connector">│</div>

                <div className="nerv-component">
                  <div className="nerv-comp-icon">🌿</div>
                  <div>
                    <strong className="nerv-comp-name">Segmental Nerves</strong>
                    <p className="nerv-comp-desc">
                      Each ganglion gives off 2 pairs of lateral nerves that innervate muscles,
                      glands, and sensory receptors of the corresponding body segment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SENSE ORGANS */}
            <div className="nerv-card nerv-senses-card">
              <h3 className="nerv-card-heading">Sense Organs</h3>
              <div className="nerv-senses-grid">
                <div className="nerv-sense-item">
                  <span className="nerv-sense-icon">👁️</span>
                  <div>
                    <strong>Photoreceptors</strong>
                    <p>5 pairs of eyes (simple ocelli) detecting light/dark</p>
                  </div>
                </div>
                <div className="nerv-sense-item">
                  <span className="nerv-sense-icon">🧪</span>
                  <div>
                    <strong>Chemoreceptors</strong>
                    <p>Segmental receptors detecting host chemicals in water</p>
                  </div>
                </div>
                <div className="nerv-sense-item">
                  <span className="nerv-sense-icon">✋</span>
                  <div>
                    <strong>Mechanoreceptors</strong>
                    <p>Annular receptors on every ring sensing touch/vibration</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="nerv-image-col">
            <div className="nerv-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810753/nervoussystem_mddmbs.png"
                alt="Nervous System of Leech"
                className="nerv-img"
              />
              <span className="nerv-img-caption">Figure: Nervous System</span>
            </div>

            <div className="nerv-summary-card">
              <h4 className="nerv-summary-title">Quick Revision</h4>
              <div className="nerv-summary-row">
                <span className="nerv-summary-label">Brain</span>
                <span className="nerv-summary-value">Supra-oesophageal ganglia</span>
              </div>
              <div className="nerv-summary-row">
                <span className="nerv-summary-label">Ganglia</span>
                <span className="nerv-summary-value">21 segmental</span>
              </div>
              <div className="nerv-summary-row">
                <span className="nerv-summary-label">Eyes</span>
                <span className="nerv-summary-value">5 pairs (ocelli)</span>
              </div>
              <div className="nerv-summary-row">
                <span className="nerv-summary-label">Type</span>
                <span className="nerv-summary-value">Ladder-type ventral</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NervousSystem;