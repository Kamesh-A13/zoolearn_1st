import React, { useMemo } from "react";
import "./Metazoa.css";

// Data extracted for clean component logic
const METAZOA_CONTENT = {
  title: "Metazoa",
  description: "Metazoa are multicellular, eukaryotic animals that show tissue-level or higher organization and generally exhibit holozoic nutrition.",
  subLabel: "Sub-kingdoms based on complexity",
  subKingdoms: [
    {
      id: "parazoa",
      title: "Parazoa",
      description: "Includes primitive organisms like sponges. In this group, cells are loosely aggregated and do not form true tissues or organs."
    },
    {
      id: "eumetazoa",
      title: "Eumetazoa",
      description: "Includes all animals other than sponges. Cells are organized into distinct structural and functional units called tissues, organs, and organ systems."
    }
  ]
};

const Metazoa = () => {
  const content = useMemo(() => METAZOA_CONTENT, []);

  return (
    <section className="metazoa-section" aria-labelledby="metazoa-heading">
      <div className="metazoa-container">
        
        {/* HEADER */}
        <header className="metazoa-header">
          <h2 id="metazoa-heading" className="metazoa-title">
            {content.title}
          </h2>
          <p className="metazoa-description">
            {content.description}
          </p>
        </header>

        {/* CONTENT BLOCK */}
        <div className="metazoa-content">
          <h3 className="metazoa-subkingdoms-label">{content.subLabel}</h3>
          
          <div className="metazoa-cards-grid">
            {content.subKingdoms.map((item) => (
              <article key={item.id} className="metazoa-info-card">
                <div className="metazoa-card-header">
                  {/* <span className="card-badge" aria-hidden="true" /> */}
                  <h4 className="metazoa-card-title">{item.title}</h4>
                </div>
                <p className="metazoa-card-text">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Metazoa;