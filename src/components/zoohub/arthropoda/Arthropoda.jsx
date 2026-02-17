import React from "react";
import { Link } from "react-router-dom";
import "./Arthropoda.css";
import ArthropodaData from "./ArthropodaData.json";

const Arthropoda = () => {
  return (
    <div className="arth-container">
      <header>
        <h1>Phylum Arthropoda</h1>
        <p className="arth-subtitle">Exploring the Ancient Sponges</p>
      </header>

      {ArthropodaData.map((category) => (
        <section key={category.id} className="arth-class-section">

          <h2 className="arth-class-heading">
            <div className="arth-bord"></div>
            <span className="arth-class-badge">Class</span>
            {category.className}
          </h2>

          <div className="arth-species-grid">
            {category.species.map((animal) => (
              <Link
                key={animal.id}
                to={animal.path}
                className="arth-species-card"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="arth-species-image"
                />

                <div className="arth-species-info">
                  <div>
                    <div className="arth-species-name">{animal.name}</div>
                    <div className="arth-species-name-scientific">
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

export default Arthropoda;
