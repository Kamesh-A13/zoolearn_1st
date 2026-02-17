import React from "react";
import { Link } from "react-router-dom";
import "./Annelida.css";
import AnnelidaData from "./AnnelidaData.json";

const Annelida = () => {
  return (
    <div className="anne-container">
      <header>
        <h1>Phylum Annelida</h1>
        <p className="anne-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {AnnelidaData.map((category) => (
        <section key={category.id} className="anne-class-section">

          <h2 className="anne-class-heading">
            <div className="anne-bord"></div>
            <span className="anne-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="anne-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="anne-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="anne-species-image"
                />

                <div className="anne-species-info">
                  <div>
                    <div className="anne-species-name">{animal.name}</div>
                    <div className="anne-species-name-scientific">
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

export default Annelida;
