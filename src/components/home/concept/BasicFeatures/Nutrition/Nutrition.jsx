import React, { useState } from "react";
import "./Nutrition.css";
import NutritionImage from "./nutrition.png"; // Ensure this path matches your folder

const Nutrition = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="nutrition-section">
        <div className="nutrition-content">

          {/* Text Group 1 */}
          <div className="nutrition-text-group">
            <h2 className="nutrition-heading">Heterotrophic Nutrition</h2>
            <p className="nutrition-text">
              All animals are heterotrophic. They are directly or indirectly
              dependent on plants for food (herbivores, carnivores, and omnivores).
            </p>
          </div>

          {/* Text Group 2 */}
          <div className="nutrition-text-group">
            <h2 className="nutrition-heading">Holozoic Mode of Nutrition</h2>
            <p className="nutrition-text">
              Nutrition involving the engulfment of whole or part of a plant or
              animal, either in solid or liquid state, is called animal-like or
              holozoic nutrition.
            </p>
          </div>

          {/* Image Container */}
          <div className="nutrition-image-container">
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767627322/Nutrition_imjqgn.png"
              alt="Holozoic nutrition in Amoeba"
              onClick={() => setOpen(true)}
              title="Click to zoom"
            />
          </div>

        </div>
      </section>

      {/* Modal / Lightbox */}
      {open && (
        <div
          className="nutrition-modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="nutrition-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="nutrition-close-btn"
              onClick={() => setOpen(false)}
            >
              &times;
            </span>

            <img
              src={NutritionImage}
              alt="Expanded nutrition diagram"
              className="nutrition-full-img"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Nutrition;