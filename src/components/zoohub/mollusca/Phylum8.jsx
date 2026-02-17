import React from "react";
import { useParams } from "react-router-dom";
import Phylum8Data from "./Phylum8Data.json";
import "./Phylum8.css";

const Phylum8 = () => {
  const { slug } = useParams();
  const species = Phylum8Data[slug];

  if (!species) {
    return <h2>Species not found</h2>;
  }

  // Convert classification array → object
  const classificationMap = {};
  species.classification.forEach(item => {
    const [key, value] = item.split(":").map(str => str.trim());
    classificationMap[key] = value;
  });

  return (
    <div className="phyl-genus-sycon-container">

      {/* ========== HERO SECTION ========== */}
      <div className="phyl-hero">
        <div className="phyl-hero-content">
          <div className="phyl-hero-text">
            <h1>
              {species.name} <br />
              <i>{species.scientificName}</i>
            </h1>
            <p>{species.description}</p>
          </div>

          {species.image && (
            <div className="phyl-hero-image">
              <img src={species.image} alt={species.name} />
            </div>
          )}
        </div>
      </div>

      {/* ========== CONTENT SECTION ========== */}
      <div className="phyl-content-section">

        {/* Introduction */}
        <div className="phyl-card">
          <h2>Introduction</h2>
          <ul>
            {species.introduction.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* General Features (LABEL BEFORE : IN BOLD) */}
        <div className="phyl-card">
          <h2>General Features</h2>
          <ul>
            {species.features.map((item, index) => {
              const [label, ...rest] = item.split(":");
              const value = rest.join(":");

              return (
                <li key={index}>
                  <strong>{label.trim()}:</strong> {value.trim()}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Size & Structure (WITH 3D MODEL INSIDE) */}
        <div className="phyl-card">
          <h2>Size & Structure</h2>

          <div className="phyl-side-by-side">
            <ul>
              {species.sizeStructure.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {species["3d"] && (
              <div className="phyl-sketchfab-embed-wrapper">
                <iframe
                  title={`${species.name} 3D`}
                  src={species["3d"]}
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Classification */}
        <div className="phyl-card phyl-tree-container">
          <h2>Classification</h2>

          <div className="phyl-tree">
            <ul>
              <li>
                <a data-level="Kingdom">{classificationMap["Kingdom"]}</a>
                <ul>
                  <li>
                    <a data-level="Phylum">{classificationMap["Phylum"]}</a>
                    <ul>
                      <li>
                        <a data-level="Class">{classificationMap["Class"]}</a>
                        <ul>
                          <li>
                            <a data-level="Order">{classificationMap["Order"]}</a>
                            <ul>
                              <li>
                                <a data-level="Family">{classificationMap["Family"]}</a>
                                <ul>
                                  <li>
                                    <a data-level="Genus">{classificationMap["Genus"]}</a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Ecology */}
        <div className="phyl-card">
          <h2>Ecology</h2>
          <ul>
            {species.ecology.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Economic Importance */}
        <div className="phyl-card">
          <h2>Economic Importance</h2>
          <ul>
            {species.economy.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      
    </div>
  );
};

export default Phylum8;