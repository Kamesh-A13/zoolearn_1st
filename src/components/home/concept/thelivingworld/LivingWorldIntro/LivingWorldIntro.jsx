import React from "react";
import "./LivingWorldIntro.css";


const LivingWorldIntro = () => {

  // Function to handle Smooth Scrolling
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="lwi-hero">
      <div className="lwi-hero-bg lwi-hero-bg-green"></div>
      <div className="lwi-hero-bg lwi-hero-bg-blue"></div>

      <div className="lwi-hero-container">
        {/* LEFT CONTENT */}
        <div className="lwi-hero-content">
          
          <h1 className="lwi-hero-title">The Living World</h1>

          <p className="lwi-hero-text">
            The living world encompasses all organisms on Earth, from microscopic
            bacteria to massive blue whales. Understanding what makes something
            <strong> “living”</strong> and how we classify this incredible
            diversity is fundamental to the study of biology.
          </p>

          <p className="lwi-hero-text">
            This chapter explores the characteristics of life, biodiversity, and
            the systematic organization of organisms through taxonomy.
          </p>

          <div className="lwi-hero-actions">

            <div className="lwi-hero-sub-actions">
              {/* Scrolls to Circle Section */}
              <button
                className="lwi-btn-secondary"
                onClick={() => scrollToSection("circle-section")}
              >
                Circle
              </button>

              {/* Scrolls to Nomenclature Section */}
              <button
                className="lwi-btn-secondary"
                onClick={() => scrollToSection("nomenclature-section")}
              >
                Nomenclature
              </button>

              {/* Scrolls to Pyramid Section */}
              <button
                className="lwi-btn-secondary"
                onClick={() => scrollToSection("pyramid-section")}
              >
                Pyramid
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lwi-hero-image-wrapper">
          
          <img src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767809047/image_pwt5qp.png" alt="The Living World Illustration" />
          <div className="lwi-image-decoration"></div>
        </div>
      </div>
    </section>
  );
};

export default LivingWorldIntro;