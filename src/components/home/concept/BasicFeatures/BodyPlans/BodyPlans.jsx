import React from 'react';
import './BodyPlans.css';

const BodyPlansPage = () => {
  const bodyPlans = [
    {
      id: 1,
      title: "Cell Aggregate Body Plan",
      description: "Organism made up of loosely arranged cells with no proper coordination",
      features: [
        "Each cell works independently",
        "No tissues or organs formed",
        "Very simple body functions"
      ],
      example: "Sponges",
      icon: "",
      color: "#3498db",
      complexity: "Low",
      diagram: "cells"
    },
    {
      id: 2,
      title: "Blind Sac Body Plan",
      description: "Incomplete digestive system with a single opening",
      features: [
        "One opening acts as both mouth and anus",
        "Food enters and waste leaves through same opening",
        "Digestion in sac-like cavity"
      ],
      example: "Coelenterates, Platyhelminthes",
      icon: "",
      color: "#2ecc71",
      complexity: "Medium",
      diagram: "sac"
    },
    {
      id: 3,
      title: "Tube-Within-a-Tube Body Plan",
      description: "Complete digestive system with separate openings",
      features: [
        "Outer tube = body wall",
        "Inner tube = digestive tract",
        "Mouth and anus are separate"
      ],
      example: "Annelida, Arthropoda, Mollusca, Echinodermata, Chordata",
      icon: "",
      color: "#e74c3c",
      complexity: "High",
      diagram: "tube"
    }
  ];

  return (
    <div className="bodyplans-body-plans-page">
      {/* Body Plans Gallery */}
      <section className="bodyplans-bodyplans-section">
        <div className="bodyplans-section-header">
           <h2 className="bodyplans-section-title">Body Plans</h2>
           <p className="bodyplans-section-subtitle">Understanding the complexity of animal body organization</p>
        </div>

        <div className="bodyplans-bodyplans-gallery">
          {bodyPlans.map((plan) => (
            <div key={plan.id} className="bodyplans-bodyplan-card">
              <div className="bodyplans-card-glow" style={{ background: plan.color }}></div>
              
              <div className="bodyplans-card-header" style={{ background: plan.color }}>
                <div className="bodyplans-plan-icon">{plan.icon}</div>
                <h3 className="bodyplans-plan-title">{plan.title}</h3>
                <div className="bodyplans-complexity-tag">
                  <span className="bodyplans-complexity-dot"></span>
                  {plan.complexity} Complexity
                </div>
              </div>

              <div className="bodyplans-card-body">
                <p className="bodyplans-plan-description">{plan.description}</p>
                
                {/* Diagram Visualization */}
                <div className={`bodyplans-diagram bodyplans-diagram-${plan.diagram}`}>
                  {plan.diagram === 'cells' && (
                    <div className="bodyplans-cells-diagram">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="bodyplans-cell" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                  )}
                  {plan.diagram === 'sac' && (
                    <div className="bodyplans-sac-diagram">
                      <div className="bodyplans-sac-opening">⭕</div>
                      <div className="bodyplans-sac-cavity"></div>
                    </div>
                  )}
                  {plan.diagram === 'tube' && (
                    <div className="bodyplans-tube-diagram">
                      <div className="bodyplans-outer-tube"></div>
                      <div className="bodyplans-inner-tube"></div>
                      <div className="bodyplans-mouth-label">Mouth</div>
                      <div className="bodyplans-anus-label">Anus</div>
                    </div>
                  )}
                </div>

                <div className="bodyplans-features-list">
                  <h4 className="bodyplans-features-title">Key Features:</h4>
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index} className="bodyplans-feature-item">
                        <span className="bodyplans-feature-marker">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bodyplans-example-box">
                  <span className="bodyplans-example-label">Examples:</span>
                  <span className="bodyplans-example-text">{plan.example}</span>
                </div>
              </div>

              <div className="bodyplans-card-footer">
                <span className="bodyplans-plan-number">0{plan.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BodyPlansPage;