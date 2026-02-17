import React from "react";
import { Link } from "react-router-dom";
import "./Mollusca.css";
import MolluscaData from "./MolluscaData.json";

const Mollusca = () => {
  return (
    <div className="moll-container">
      <header>
        <h1>Phylum Mollusca</h1>
        <p className="moll-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {MolluscaData.map((category) => (
        <section key={category.id} className="moll-class-section">

          <h2 className="moll-class-heading">
            <div className="moll-bord"></div>
            <span className="moll-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="moll-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="moll-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="moll-species-image"
                />

                <div className="moll-species-info">
                  <div>
                    <div className="moll-species-name">{animal.name}</div>
                    <div className="moll-species-name-scientific">
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

export default Mollusca;
