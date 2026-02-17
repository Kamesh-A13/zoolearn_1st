import React, { useState } from "react";
import "./Binomial.css";

function BinomialNomenclature() {
  const [open, setOpen] = useState(false);

  // Assuming 'tiger' variable was meant to be the image URL or imported
  const tigerImage = "https://res.cloudinary.com/duibfmcw1/image/upload/v1767809416/tiger_y9orpy.jpg";

  return (
    <section className="binomial-section">

      {/* SECTION 1: Intro */}
      <div className="binomial-wrapper">
        <h1 className="binomial-main-heading">Binomial Nomenclature</h1>

        <div className="binomial-intro-highlight">
          <p style={{ margin: 0, color: "#1e3a8a" }}>
            Binomial nomenclature was introduced by <strong>Carolus Linnaeus</strong>{" "}
            (1753–1758). It is a scientific system of naming organisms to ensure
            universal identification.
          </p>
        </div>

        {/* Thumbnail Image */}
        <img
          src={tigerImage}
          alt="Tiger Thumbnail"
          className="binomial-modal-img"
          onClick={() => setOpen(true)}
        />

        <p>Every organism is given <strong>two Latin names</strong>:</p>

        <ul className="binomial-custom-list">
          <li><strong>First word:</strong> Genus (Capitalized)</li>
          <li><strong>Second word:</strong> Species (lowercase)</li>
        </ul>

        <div className="binomial-example-box">
          <span className="binomial-box-label" style={{ color: "#15803d" }}>Examples:</span>
          <ul className="binomial-custom-list" style={{ marginBottom: 0 }}>
            <li><em>Mangifera indica</em> → Mango</li>
            <li><em>Solanum tuberosum</em> → Potato</li>
          </ul>
        </div>

        <div className="binomial-work-box">
          <span className="binomial-box-label" style={{ color: "#4338ca" }}>Key Works by Linnaeus:</span>
          <ul className="binomial-custom-list" style={{ marginBottom: 0 }}>
            <li><strong>Species Plantarum</strong> – 5,900 plant species</li>
            <li><strong>Systema Naturae</strong> – 4,326 animal species</li>
          </ul>
        </div>

        <div className="binomial-honor-text">
          Hence, Carolus Linnaeus is known as the <br />
          <strong>“Father of Taxonomy”</strong>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {open && (
        <div className="binomial-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="binomial-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="binomial-close-btn"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <img
              src={tigerImage}
              alt="Enlarged Tiger"
              className="binomial-modal-full-img"
            />
          </div>
        </div>
      )}

    </section>
  );
}

export default BinomialNomenclature;