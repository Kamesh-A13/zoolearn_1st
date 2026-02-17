import "./locomotion.css";

const Locomotion = () => {
  return (
    <section className="loco-section">
      <div className="loco-container">

        {/* HEADER */}
        <div className="loco-header">
          <h2 className="loco-title">Locomotion</h2>
          <p className="loco-intro">
            Despite lacking legs, setae, or parapodia, leeches are surprisingly mobile.
            They move using <strong>two distinct mechanisms</strong>, powered by the coordinated
            contraction and relaxation of <strong>circular and longitudinal muscles</strong>.
          </p>
        </div>

        <div className="loco-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="loco-text-col">

            {/* Movement 1: LOOPING */}
            <div className="loco-movement-card">
              <div className="loco-card-number">01</div>
              <div className="loco-card-body">
                <h3 className="loco-movement-name">Looping / Crawling</h3>
                <p className="loco-movement-desc">
                  The primary mode of terrestrial movement. The leech moves by <strong>alternately attaching
                    and detaching</strong> its anterior and posterior suckers:
                </p>
                <div className="loco-steps">
                  <div className="loco-step">
                    <span className="loco-step-num">1</span>
                    <span>Posterior sucker attaches firmly to the surface</span>
                  </div>
                  <div className="loco-step">
                    <span className="loco-step-num">2</span>
                    <span>Circular muscles contract → body elongates forward</span>
                  </div>
                  <div className="loco-step">
                    <span className="loco-step-num">3</span>
                    <span>Anterior sucker attaches to a new position</span>
                  </div>
                  <div className="loco-step">
                    <span className="loco-step-num">4</span>
                    <span>Longitudinal muscles contract → body pulls up in a loop</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement 2: SWIMMING */}
            <div className="loco-movement-card">
              <div className="loco-card-number">02</div>
              <div className="loco-card-body">
                <h3 className="loco-movement-name">Swimming</h3>
                <p className="loco-movement-desc">
                  In water, the leech swims by producing <strong>wave-like undulations</strong>
                  of the flattened body. The body flattens dorso-ventrally and creates rhythmic
                  sinusoidal waves that propel it through the water.
                </p>
                <div className="loco-detail-row">
                  <span className="loco-detail-icon">💡</span>
                  <span className="loco-detail-text">
                    Both suckers are <strong>detached</strong> during swimming — the posterior sucker
                    acts as a rudder for steering direction.
                  </span>
                </div>
              </div>
            </div>

            {/* Muscle Info */}
            <div className="leech-callout leech-callout-info">
              <strong>🔬 Muscle Mechanics</strong>
              The body wall contains three muscle layers: an outer circular layer, a middle oblique layer,
              and an inner longitudinal layer. When circular muscles contract, the body elongates; when
              longitudinal muscles contract, it shortens — together creating the looping motion.
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="loco-image-col">
            <div className="loco-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810794/leech_imk2bj.jpg"
                alt="Leech Locomotion"
                className="loco-img"
              />
              <span className="loco-img-label">Figure: Leech in locomotion</span>
            </div>

            <div className="leech-callout leech-callout-fact" style={{ marginTop: '1rem' }}>
              <strong>🐛 Fun Fact</strong>
              A leech can cover approximately 10–15 cm per second while swimming — that's nearly half its body
              length each second!
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Locomotion;