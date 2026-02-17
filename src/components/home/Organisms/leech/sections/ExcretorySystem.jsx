import "./excretorySystem.css";

const ExcretorySystem = () => {
  return (
    <section className="excr-section">
      <div className="excr-container">

        {/* HEADER */}
        <div className="excr-header">
          <h2 className="excr-title">Excretory System</h2>
        </div>

        <div className="excr-grid">

          {/* LEFT: TEXT CONTENT */}
          <div className="excr-content">

            {/* INTRO */}
            <div className="excr-card">
              <div className="excr-card-accent"></div>
              <h3 className="excr-card-heading">Nephridia — 17 Pairs</h3>
              <p className="excr-card-text">
                The excretory organs of the leech are <strong>17 pairs of segmentally-arranged nephridia
                  (metanephridia)</strong>, located in segments 6 to 22. Each nephridium opens externally
                through a <strong>nephridiopore</strong> on the ventral surface.
              </p>
            </div>

            {/* STRUCTURE */}
            <div className="excr-card">
              <h3 className="excr-card-heading">Structure of a Single Nephridium</h3>
              <p className="excr-card-text">
                Each nephridium consists of three main parts:
              </p>
              <div className="excr-parts-list">
                {[
                  {
                    num: '1',
                    name: 'Nephrostome (Ciliated Funnel)',
                    desc: 'A ciliated funnel-shaped opening that collects waste from the haemocoelic fluid. The cilia create a current that draws fluid into the tubule.',
                    func: 'Collection'
                  },
                  {
                    num: '2',
                    name: 'Nephridial Tubule (Main Body)',
                    desc: 'A highly coiled tube lined with glandular cells. Selectively reabsorbs useful substances (glucose, salts) while concentrating nitrogenous waste (ammonia, urea).',
                    func: 'Filtration'
                  },
                  {
                    num: '3',
                    name: 'Nephridiopore (External Opening)',
                    desc: 'A tiny pore on the ventral body surface through which concentrated waste is expelled to the exterior. Located on segments 6–22.',
                    func: 'Excretion'
                  }
                ].map((part, i) => (
                  <div key={i} className="excr-part-card">
                    <div className="excr-part-num">{part.num}</div>
                    <div className="excr-part-info">
                      <div className="excr-part-header">
                        <strong className="excr-part-name">{part.name}</strong>
                        <span className="excr-part-badge">{part.func}</span>
                      </div>
                      <p className="excr-part-desc">{part.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WASTE TYPE */}
            <div className="excr-card">
              <h3 className="excr-card-heading">Nature of Excretory Waste</h3>
              <p className="excr-card-text">
                The leech is primarily <strong>ammonotelic</strong> (excretes ammonia), though some urea is also produced.
                Being aquatic, the ammonia is readily dissolved and washed away with the surrounding water.
              </p>
            </div>

            {/* COMPARISON */}
            <div className="leech-callout leech-callout-info">
              <strong>🔬 Quick Comparison with Earthworm</strong>
              Both leeches and earthworms have metanephridia, but the leech has only <strong>17 pairs</strong>
              (segments 6–22), while the earthworm has nephridia in nearly <strong>every segment</strong>
              from the 3rd onwards. Also, the leech's nephrostome opens into haemocoelic fluid,
              not a true coelomic cavity.
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="excr-image-col">
            <div className="excr-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810724/excretorysystem_xq4phc.png"
                alt="Excretory System of Leech"
                className="excr-img"
              />
              <span className="excr-img-caption">Figure: Structure of Nephridium</span>
            </div>

            <div className="excr-summary-card">
              <h4 className="excr-summary-title">At a Glance</h4>
              <div className="excr-summary-row">
                <span className="excr-summary-label">Organs</span>
                <span className="excr-summary-value">17 pairs nephridia</span>
              </div>
              <div className="excr-summary-row">
                <span className="excr-summary-label">Location</span>
                <span className="excr-summary-value">Segments 6–22</span>
              </div>
              <div className="excr-summary-row">
                <span className="excr-summary-label">Waste</span>
                <span className="excr-summary-value">Ammonia (ammonotelic)</span>
              </div>
              <div className="excr-summary-row">
                <span className="excr-summary-label">Opening</span>
                <span className="excr-summary-value">Nephridiopores (ventral)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExcretorySystem;