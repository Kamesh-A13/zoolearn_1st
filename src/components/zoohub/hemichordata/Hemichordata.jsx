import React from "react";
import { Link } from "react-router-dom";
import "./Hemichordata.css";
import HemichordataData from "./HemichordataData.json";

const Hemichordata = () => {
  return (
    <div className="hemi-container">
      <header>
        <h1>Phylum Hemichordata</h1>
        <p className="hemi-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {HemichordataData.map((category) => (
        <section key={category.id} className="hemi-class-section">

          <h2 className="hemi-class-heading">
            <div className="hemi-bord"></div>
            <span className="hemi-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="hemi-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="hemi-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="hemi-species-image"
                />

                <div className="hemi-species-info">
                  <div>
                    <div className="hemi-species-name">{animal.name}</div>
                    <div className="hemi-species-name-scientific">
                      {animal.scientificName}
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Hemichordata;
