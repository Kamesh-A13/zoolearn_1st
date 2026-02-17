import React from "react";
import { Link } from "react-router-dom";
import "./Chordata.css";
import ChordataData from "./ChordataData.json";

const Chordata = () => {
  return (
    <div className="chor-container">
      <header>
        <h1>Phylum Chordata</h1>
        <p className="chor-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {ChordataData.map((category) => (
        <section key={category.id} className="chor-class-section">

          <h2 className="chor-class-heading">
            <div className="chor-bord"></div>
            <span className="chor-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="chor-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="chor-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="chor-species-image"
                />

                <div className="chor-species-info">
                  <div>
                    <div className="chor-species-name">{animal.name}</div>
                    <div className="chor-species-name-scientific">
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

export default Chordata;
