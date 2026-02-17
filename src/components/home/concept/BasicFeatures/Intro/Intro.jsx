import React from "react";
import "./intro.css";

const BasicFeaturesIndex = () => {
  
  // Function to handle Smooth Scrolling
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      // Offset matches height of sticky headers if you have them, 
      // otherwise 'start' aligns it to the top.
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="intro-hero">
      {/* Background glows */}
      <div className="intro-hero-bg intro-hero-bg-green"></div>
      <div className="intro-hero-bg intro-hero-bg-blue"></div>

      <div className="intro-hero-container">
        {/* LEFT CONTENT */}
        <div className="intro-hero-content">
          <h1 className="intro-hero-title">
            Basic Features of Classification
          </h1>

          <p className="intro-hero-text">
            The kingdom <strong>Animalia</strong> is characterised by
            <strong> heterotrophic</strong>,
            <strong> eukaryotic</strong>,
            <strong> multicellular</strong> organisms whose cells
            <strong> lack a cell wall</strong>.
          </p>

          <p className="intro-hero-text">
            All animals are <strong>heterotrophic</strong> and are directly or
            indirectly dependent on plants for food.
          </p>

          <p className="intro-hero-text">
            Nutrition involving the engulfment of whole or part of a plant or
            animal, in solid or liquid form, is called
            <strong> holozoic nutrition</strong>.
          </p>

          <div className="intro-hero-actions">

            {/* Navigation Buttons */}
            <div className="intro-hero-sub-actions intro-secondary-row">
              
              <button 
                className="intro-btn-secondary"
                onClick={() => scrollToSection("levels-section")}
              >
                Level of Organization
              </button>

              <button 
                className="intro-btn-secondary"
                onClick={() => scrollToSection("symmetry-section")}
              >
                Body Symmetry
              </button>

              <button 
                className="intro-btn-secondary"
                onClick={() => scrollToSection("germ-section")}
              >
                Germ Layer
              </button>

              <button 
                className="intro-btn-secondary"
                onClick={() => scrollToSection("coelom-section")}
              >
                Coelom
              </button>

              <button 
                className="intro-btn-secondary"
                onClick={() => scrollToSection("taxonomy-section")}
              >
                Classification of Tree
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="intro-hero-image">
          <img
            alt="Basic Features of Classification"
            src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810735/1000083461-removebg-preview_pmodrn.png"
          />
        </div>
      </div>
    </section>
  );
};

export default BasicFeaturesIndex;