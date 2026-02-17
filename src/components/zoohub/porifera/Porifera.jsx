import React from "react";
import { Link } from "react-router-dom";
import "./Porifera.css";
import poriferaData from "./poriferaData.json";

const Porifera = () => {
  return (
    <div className="pori-container">
      <header>
        <h1>Phylum Porifera</h1>
        <p className="pori-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {poriferaData.map((category) => (
        <section key={category.id} className="pori-class-section">

          <h2 className="pori-class-heading">
            <div className="pori-bord"></div>
            <span className="pori-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="pori-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="pori-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="pori-species-image"
                />

                <div className="pori-species-info">
                  <div>
                    <div className="pori-species-name">{animal.name}</div>
                    <div className="pori-species-name-scientific">
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

export default Porifera;
