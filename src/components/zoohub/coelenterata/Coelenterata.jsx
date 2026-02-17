import React from "react";
import { Link } from "react-router-dom";
import "./Coelenterata.css";
import CoelenterataData from "./CoelenterataData.json";

const Coelenterata = () => {
  return (
    <div className="coel-container">
      <header>
        <h1>Phylum Coelenterata</h1>
        <p className="coel-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {CoelenterataData.map((category) => (
        <section key={category.id} className="coel-class-section">

          <h2 className="coel-class-heading">
            <div className="coel-bord"></div>
            <span className="coel-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="coel-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="coel-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="coel-species-image"
                />

                <div className="coel-species-info">
                  <div>
                    <div className="coel-species-name">{animal.name}</div>
                    <div className="coel-species-name-scientific">
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

export default Coelenterata;
