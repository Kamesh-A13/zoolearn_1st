import "./externalMorphology.css";

const ExternalMorphology = () => {
  return (
    <section className="leech-section-content">

      {/* TOP SECTION: Split Layout */}
      <div className="leech-grid-2">

        {/* LEFT: IMAGE CARD */}
        <div className="leech-section-box em-image-card">
          <div className="em-image-container">
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810830/morphology_sf7xd1.png"
              alt="External Morphology of Leech"
              className="em-main-img"
            />
            <p className="em-img-caption">Figure: External Morphology of <em>Hirudinaria granulosa</em></p>
          </div>
        </div>

        {/* RIGHT: STACKED TEXT CARDS */}
        <div className="em-text-stack">

          {/* CARD 1: Shape & Colour */}
          <div className="leech-section-box">
            <h3 className="leech-section-title">Shape and Size</h3>
            <p className="leech-section-text">
              The body of the leech is soft, elongated, vermiform (worm-like), and metamerically segmented.
              It is <strong>bilaterally symmetrical</strong> and <strong>dorso-ventrally flattened</strong>.
              The body appears ribbon-shaped when relaxed but becomes cylindrical during extension.
              It can grow <strong>up to 35 cm</strong> in length.
            </p>

            <h3 className="leech-section-title">Colour</h3>
            <ul className="leech-section-list">
              <li><strong>Dorsal surface:</strong> Olive green with characteristic markings</li>
              <li><strong>Ventral surface:</strong> Orange-yellow to orange-red</li>
            </ul>
            <div className="leech-callout leech-callout-info">
              <strong>💡 Why the colour difference?</strong>
              The green dorsal surface provides camouflage among aquatic vegetation, while the bright ventral
              surface aids in species recognition during mating. This countershading is a common adaptation in aquatic organisms.
            </div>
          </div>

          {/* CARD 2: Segmentation & Senses */}
          <div className="leech-section-box">
            <h3 className="leech-section-title">Segmentation</h3>
            <p className="leech-section-text">
              The body shows <strong>true metamerism</strong> (internal + external segmentation) and is divided into
              <strong> 33 segments</strong>. Each segment is further subdivided into smaller rings called
              <strong> annuli</strong> — typically <strong>3 to 5 annuli per segment</strong>.
              The annuli give the leech its characteristic banded appearance.
            </p>

            <h3 className="leech-section-title">Sense Receptors</h3>
            <p className="leech-section-text">
              The leech has <strong>five pairs of eyes</strong> located on the first five body segments.
              These are simple ocelli capable only of detecting light intensity, not forming images.
              Additional sensory projections called <strong>receptors</strong> are present:
            </p>
            <ul className="leech-section-list">
              <li><strong>Annular receptors:</strong> Present on each annulus — detect touch and vibration</li>
              <li><strong>Segmental receptors:</strong> Found on the first annulus of each segment — chemoreceptors for detecting host chemicals</li>
            </ul>
          </div>

        </div>
      </div>

      {/* MIDDLE SECTION: SUCKERS */}
      <div className="leech-section-box">
        <h3 className="leech-section-title">Suckers — Attachment Organs</h3>
        <p className="leech-section-text">
          The leech possesses two suckers that serve as the primary organs of attachment and locomotion.
          Both are muscular, disc-shaped structures but differ in position and function.
        </p>

        <div className="leech-grid-2">
          {/* Anterior */}
          <div className="em-sucker-card">
            <div className="em-sucker-header">
              <span className="em-sucker-number">01</span>
              <h4 className="em-sucker-name">Anterior (oral) sucker</h4>
            </div>
            <ul className="leech-section-list">
              <li>Located at the front end, ventral in position</li>
              <li>Formed by segments 1–5 (cephalic region)</li>
              <li>Contains the mouth at its centre</li>
              <li>Bears three jaws with minute teeth</li>
              <li>Used for <strong>feeding</strong> and <strong>attachment to host</strong></li>
            </ul>
          </div>

          {/* Posterior */}
          <div className="em-sucker-card">
            <div className="em-sucker-header">
              <span className="em-sucker-number">02</span>
              <h4 className="em-sucker-name">Posterior sucker</h4>
            </div>
            <ul className="leech-section-list">
              <li>Formed by the fusion of segments 27–33</li>
              <li>Large, circular, disc-shaped</li>
              <li>Lacks jaws or mouth — purely locomotory</li>
              <li>Provides <strong>firm anchorage</strong> during feeding</li>
              <li>Acts as the <strong>fixed point</strong> in looping movement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: APERTURES */}
      <div className="leech-section-box">
        <h3 className="leech-section-title">External Apertures</h3>
        <p className="leech-section-text">
          Various openings on the body surface serve as entry and exit points for different organ systems.
        </p>

        <div className="em-apertures-grid">
          {[
            { icon: '👄', name: 'Mouth', desc: 'Centre of the anterior sucker; triradiate (Y-shaped) opening', seg: 'Seg 1–5' },
            { icon: '◎', name: 'Anus', desc: 'Small mid-dorsal opening on the 26th segment', seg: 'Seg 26' },
            { icon: '💧', name: 'Nephridiopores', desc: '17 pairs opening ventrally (segments 6–22) for waste excretion', seg: 'Seg 6–22' },
            { icon: '♂', name: 'Male genital pore', desc: 'Mid-ventral opening between 2nd and 3rd annuli of 10th segment', seg: 'Seg 10' },
            { icon: '♀', name: 'Female genital pore', desc: 'Mid-ventral opening between 2nd and 3rd annuli of 11th segment', seg: 'Seg 11' }
          ].map((item, idx) => (
            <div key={idx} className="em-aperture-card">
              <span className="em-aperture-icon">{item.icon}</span>
              <div className="em-aperture-info">
                <div className="em-aperture-header-row">
                  <strong className="em-aperture-name">{item.name}</strong>
                  <span className="em-aperture-seg">{item.seg}</span>
                </div>
                <span className="em-aperture-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DID YOU KNOW */}
      <div className="leech-callout leech-callout-fact">
        <strong>🔬 Did You Know?</strong>
        The leech body has no appendages — no setae, parapodia, or limbs. This is a parasitic adaptation
        that gives the body a smooth, streamlined shape, allowing it to attach firmly to the host without obstruction.
      </div>

    </section>
  );
};

export default ExternalMorphology;