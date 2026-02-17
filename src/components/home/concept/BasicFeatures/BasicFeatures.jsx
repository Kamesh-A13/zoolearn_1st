import React from "react";
import "./BasicFeatures.css";

/* IMPORT ALL SESSIONS */
/* Ensure this points to the updated Intro file below */
import Intro from "./Intro/Intro"; 

import Nutrition from "./Nutrition/Nutrition";
import Metazoa from "./Metazoa/Metazoa";
import LevelsOfOrganisation from "./LevelsOfOrganisation/LevelsOfOrganisation";
import BodySymmetry from "./BodySymmetry/BodySymmetry";
import GermLayers from "./GermLayers/GermLayers";
import Coelom from "./Coelom/Coelom";
import BodyPlans from "./BodyPlans/BodyPlans";
import ProtostomeComparison from "./BodyPlans/ProtostomeComparison";
import Development from "./Development/Development";
import TaxonomySession from "./TaxonomySession/TaxonomySession";

const BasicFeatures = () => {
  return (
    <div className="basic-features-page">
      <div className="basic-features-container">
        
        {/* The Intro Banner with Navigation Buttons */}
        <Intro />

        {/* Other Content (Not linked to buttons, but part of the flow) */}
        <Nutrition />
        <Metazoa />

        {/* --- LINKED SECTIONS --- */}

        {/* 1. Levels of Organization */}
        <section id="levels-section">
          <LevelsOfOrganisation />
        </section>

        {/* 2. Body Symmetry */}
        <section id="symmetry-section">
          <BodySymmetry />
        </section>

        {/* 3. Germ Layers */}
        <section id="germ-section">
          <GermLayers />
        </section>

        {/* 4. Coelom */}
        <section id="coelom-section">
          <Coelom />
        </section>

        {/* Intermediary Content */}
        <BodyPlans />
        <ProtostomeComparison />
        <Development />

        {/* 5. Classification (Taxonomy) */}
        <section id="taxonomy-section">
          <TaxonomySession />
        </section>

      </div>
    </div>
  );
};

export default BasicFeatures;