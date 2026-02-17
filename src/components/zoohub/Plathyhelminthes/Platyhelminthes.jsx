import React from "react";
import { Link } from "react-router-dom";
import "./Platyhelminthes.css";
import PlatyhelminthesData from "./PlatyhelminthesData.json";

const Platyhelminthes = () => {
  return (
    <div className="plat-container">
      <header>
        <h1>Phylum Platyhelminthes</h1>
        <p className="plat-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {PlatyhelminthesData.map((category) => (
        <section key={category.id} className="plat-class-section">

          <h2 className="plat-class-heading">
            <div className="plat-bord"></div>
            <span className="plat-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="plat-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="plat-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="plat-species-image"
                />

                <div className="plat-species-info">
                  <div>
                    <div className="plat-species-name">{animal.name}</div>
                    <div className="plat-species-name-scientific">
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

export default Platyhelminthes;
