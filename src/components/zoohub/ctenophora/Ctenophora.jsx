import React from "react";
import { Link } from "react-router-dom";
import "./Ctenophora.css";
import CtenophoraData from "./CtenophoraData.json";

const Ctenophora = () => {
  return (
    <div className="cten-container">
      <header>
        <h1>Phylum Ctenophora</h1>
        <p className="cten-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {CtenophoraData.map((category) => (
        <section key={category.id} className="cten-class-section">

          <h2 className="cten-class-heading">
            <div className="cten-bord"></div>
            <span className="cten-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="cten-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="cten-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="cten-species-image"
                />

                <div className="cten-species-info">
                  <div>
                    <div className="cten-species-name">{animal.name}</div>
                    <div className="cten-species-name-scientific">
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

export default Ctenophora;
