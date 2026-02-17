import React from "react";
import { Link } from "react-router-dom";
import "./Echinodermata.css";
import EchinodermataData from "./EchinodermataData.json";

const Echinodermata = () => {
  return (
    <div className="echi-container">
      <header>
        <h1>Phylum Echinodermata</h1>
        <p className="echi-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {EchinodermataData.map((category) => (
        <section key={category.id} className="echi-class-section">

          <h2 className="echi-class-heading">
            <div className="echi-bord"></div>
            <span className="echi-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="echi-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="echi-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="echi-species-image"
                />

                <div className="echi-species-info">
                  <div>
                    <div className="echi-species-name">{animal.name}</div>
                    <div className="echi-species-name-scientific">
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

export default Echinodermata;
