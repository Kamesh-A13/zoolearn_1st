import React from "react";
import "./ProtostomeComparison.css";

const ProtostomeComparison = () => {
  return (
    <div className="proto-comparison-wrapper">

      {/* ===== HEADER ===== */}
      <div className="proto-header-row proto-slide-in">
        <div className="proto-header-col proto-header-protostome">
          <h2>PROTOSTOMOUS</h2>
          <p>(proto: first; stomium: mouth)</p>
        </div>
        <div className="proto-header-col proto-header-deuterostome">
          <h2>DEUTEROSTOMOUS</h2>
          <p>(deuteron: second; stomium: mouth)</p>
        </div>
      </div>

      {/* ===== DEFINITIONS ===== */}
      <div className="proto-content-row proto-slide-in proto-delay-1">
        <div className="proto-row-content proto-bg-protostome proto-hover-card" data-label="PROTOSTOME">

          <div className="proto-info-box">
            In protostomous animals, the first opening formed in the embryo
            (blastopore) becomes the <strong>mouth</strong>.
            The anus forms later at another place.
          </div>
          <div className="proto-info-box">
            Simple to moderately complex body organization.
            Mostly belong to one major evolutionary line.
          </div>
          <div className="proto-info-box proto-highlight-text">
            👉 Blastopore → Mouth first
          </div>
        </div>

        <div className="proto-row-content proto-bg-deuterostome proto-hover-card" data-label="DEUTEROSTOME">

          <div className="proto-info-box">
            In deuterostomous animals, the blastopore develops into the
            <strong> anus</strong>.
            The mouth forms later on the opposite side.
          </div>
          <div className="proto-info-box">
            More advanced animals with complex body organization
            and internal skeletons.
          </div>
          <div className="proto-info-box proto-highlight-text">
            👉 Blastopore → Anus first
          </div>
        </div>
      </div>

      {/* ===== CLEAVAGE ===== */}
      <div className="proto-content-row proto-slide-in proto-delay-2">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-badge-pill">(a) CLEAVAGE</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600219/image_2_jfn8yx.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              title="Spiral cleavage in protostomes"
            ></div>
          </div>
          <span className="proto-stage-title">Eight-cell stage</span>
          <p className="proto-row-desc">Spiral and determinate cleavage</p>
        </div>

        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-badge-pill">(a) CLEAVAGE</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage:`url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600218/image_2_hjofss.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                
              }}
              title="Radial cleavage in deuterostomes"
            ></div>
          </div>
          <span className="proto-stage-title">Eight-cell stage</span>
          <p className="proto-row-desc">Radial and indeterminate cleavage</p>
        </div>
      </div>

      {/* ===== COELOM FORMATION ===== */}
      <div className="proto-content-row proto-slide-in proto-delay-3">
        <div className="proto-row-content proto-bg-protostome proto-hover-card proto-pulse-anim">
          <div className="proto-badge-pill">(b) COELOM FORMATION</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600220/image_3_h5sibm.png')`,
                backgroundSize: 'cover',
                backgroundColor: '#ffffff'
              }}
              title="Schizocoelous coelom formation"
            ></div>
          </div>
          <div className="proto-info-box">
            <strong>SCHIZOCOELOUS FORMATION</strong>
            Solid masses of mesoderm split to form the coelom cavity.
          </div>
        </div>

        <div className="proto-row-content proto-bg-deuterostome proto-hover-card proto-pulse-anim">
          <div className="proto-badge-pill">(b) COELOM FORMATION</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600218/image_3_pxwhbm.png')`,
                backgroundSize: 'cover',
                backgroundColor: '#ffffff'
              }}
              title="Enterocoelous coelom formation"
            ></div>
          </div>
          <div className="proto-info-box">
            <strong>ENTEROCOELOUS FORMATION</strong>
            Folds of the archenteron form the coelom cavity.
          </div>
        </div>
      </div>

      {/* ===== FATE OF BLASTOPORE ===== */}
      <div className="proto-content-row proto-slide-in proto-delay-3">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-badge-pill">(c) FATE OF BLASTOPORE</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600221/image_4_br8wr3.png')`,
                backgroundSize: 'cover',
                backgroundColor: '#f0f7fa'
              }}
              title="Protostome development process"
            ></div>
          </div>
          <p className="proto-row-desc">Mouth develops from blastopore</p>
          <p className="proto-row-desc">Digestive tube → Anus forms secondarily</p>
        </div>

        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-badge-pill">(c) FATE OF BLASTOPORE</div>
          <div className="proto-visual-frame">
            <div 
              className="proto-sprite-img"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/duibfmcw1/image/upload/v1767600219/image_4_bzdgh2.png')`,
                backgroundSize: 'cover',
                backgroundColor: '#f1f8e9'
              }}
              title="Deuterostome development process"
            ></div>
          </div>
          <p className="proto-row-desc">Anus develops from blastopore</p>
          <p className="proto-row-desc">Digestive tube → Mouth forms secondarily</p>
        </div>
      </div>

      {/* ===== EXAMPLES ===== */}
      <div className="proto-content-row proto-slide-in proto-delay-3 proto-compact-examples">
        <div className="proto-row-content proto-bg-protostome proto-hover-card">
          <div className="proto-info-box">
            <strong>PROTOSTOME EXAMPLES</strong>
            Flatworms, Roundworms, Annelids, Arthropods, Molluscs
          </div>
        </div>

        <div className="proto-row-content proto-bg-deuterostome proto-hover-card">
          <div className="proto-info-box">
            <strong>DEUTEROSTOME EXAMPLES</strong>
            Echinoderms, Hemichordates, Chordates (including vertebrates)
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProtostomeComparison;