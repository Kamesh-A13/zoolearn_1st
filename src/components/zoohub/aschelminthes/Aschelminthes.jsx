import React from "react";
import { Link } from "react-router-dom";
import "./Aschelminthes.css";
import AschelminthesData from "./AschelminthesData.json";

const Aschelminthes = () => {
  return (
    <div className="asch-container">
      <header>
        <h1>Phylum Aschelminthes</h1>
        <p className="asch-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {AschelminthesData.map((category) => (
        <section key={category.id} className="asch-class-section">

          <h2 className="asch-class-heading">
            <div className="asch-bord"></div>
            <span className="asch-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="asch-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="asch-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="asch-species-image"
                />

                <div className="asch-species-info">
                  <div>
                    <div className="asch-species-name">{animal.name}</div>
                    <div className="asch-species-name-scientific">
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

export default Aschelminthes;
