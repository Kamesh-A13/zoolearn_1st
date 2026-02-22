import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  // Navigation Logic
  const handleOrganismClick = (org) => {
    if (org.id === "leech") {
      navigate("/leech");
    } else if (org.id === "rabbit") {
      navigate("/rabbit");
    } else if (org.id === "honeybee") {
      navigate("/honeybee");
    } else if (org.id === "cockroach") {
      navigate("/cockroach");
    } else {
      // Dummy command/location for all other organisms
      console.log(`Navigating to dummy location for ${org.name}`);
      alert(`The ${org.name} module is currently under development.`);
    }
  };

  const curriculumItems = [
    {
      title: "Basic Zoology",
      description:
        "Fundamentals of animal life, cell biology, and basic physiological structures.",
      icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780953/001-zoology_baecrg.png",
      route: "/living-world",
    },
    {
      title: "Basic Features of Classification",
      description:
        "Taxonomy, phylogeny, biological hierarchy, and animal kingdom organization.",
      icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780954/004-habitat_z6ev5r.png",
      route: "/basic-features-of-classification",
    },
    {
      title: "Patterns of complexities",
      description:
        "Detailed study of internal organ systems, structure, and physiological functions.",
      icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780953/003-chaos_pfqepw.png",
      route: "/anatomy",
    },
    {
      title: "Kingdom of Animalia (Under Development)",
      description:
        "This module is currently under development. Stay tuned for updates!",
      icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780954/005-wild-animals_gikq7m.png",
      route: null,
    },
    {
      title: "Evolution",
      description:
        "Theories of evolution, natural selection, speciation, and biological evidence.",
      icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780954/006-dna_wrm2wd.png",
      route: "/evolution",
    },
    /* {
       title: "Diversity",
       description:
         "Global biodiversity patterns, conservation strategies, and endangered species.",
       icon: "https://cdn-icons-png.flaticon.com/512/2920/2920325.png",
       route: "/diversity",
     }, */
  ];

  const organisms = [
    {
      id: "leech",
      name: "Leech",
      scientificName: "Hirudinaria granulosa",
      classification: "Phylum: Annelida",
      image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1766035779/004-leech-therapy_puotxa.png",
      hours: 9,
    },
    {
      id: "rabbit",
      name: "Rabbit",
      scientificName: "Oryctolagus cuniculus",
      classification: "Class: Mammalia",
      image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1766035803/006-rabbit_apbtkw.png",
      hours: 15,
    },
    /* {
      id: "earthworm",
      name: "Earthworm",
      scientificName: "Pheretima posthuma",
      classification: "Phylum: Annelida",
      image: "https://img.icons8.com/fluency/96/earthworm.png",
      hours: 8,
    }, */
    {
      id: "cockroach",
      name: "Cockroach",
      scientificName: "Periplaneta americana",
      classification: "Phylum: Arthropoda",
      image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1766035805/007-cockroach_zzavof.png",
      hours: 10,
    },
    /* {
       id: "frog",
       name: "Frog",
       scientificName: "Rana tigrina",
       classification: "Class: Amphibia",
       image: "https://img.icons8.com/fluency/96/frog.png",
       hours: 12,
     }, */
    {
      id: "honeybee",
      name: "Honey Bee",
      scientificName: "Apis mellifera",
      classification: "Class: Insecta",
      image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767780954/007-holidays_tgjy05.png",
      hours: 9,
    },
    {
      id: "human",
      name: "Human Evolution",
      scientificName: "Homo sapiens",
      classification: "Class: Mammalia",
      image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1766035808/008-evolution_o5byjy.png",
      hours: 25,
    },
    /* {
       id: "horse",
       name: "Horse Evolution",
       scientificName: "Equus ferus caballus",
       classification: "Class: Mammalia",
       image: "https://img.icons8.com/fluency/96/trotting-horse.png",
       hours: 14,
     }, */
  ];

  return (
    <div className="learn-learning-page">
      {/* ================= CONCEPTUAL LEARNING ================= */}
      <section className="learn-section-wrapper learn-bg-light">
        <div className="learn-container">
          <div className="learn-section-header">
            <span className="learn-section-tag">Fundamentals</span>
            <h2 className="learn-section-title">Conceptual Learning Path</h2>
            <p className="learn-section-subtitle">
              Build strong zoology foundations with concept-first modules.
            </p>
          </div>

          <div className="learn-conceptual-grid">
            {curriculumItems.map((item, index) => (
              <div
                key={index}
                className="learn-conceptual-card"
                onClick={() => item.route && navigate(item.route)}
                style={{ cursor: item.route ? "pointer" : "default" }}
              >
                <div>
                  <div className="learn-icon-box">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <button
                  className="learn-btn-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.route && navigate(item.route);
                  }}
                >
                  Start Module →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ORGANISMS ================= */}
      <section className="learn-section-wrapper">
        <div className="learn-container">
          <div className="learn-section-header">
            <span className="learn-section-tag">Deep Dive</span>
            <h2 className="learn-section-title">Master Key Organisms</h2>
            <p className="learn-section-subtitle">
              Detailed anatomy and physiology of NEET-important organisms.
            </p>
          </div>

          <div className="learn-organisms-grid">
            {organisms.map((org) => (
              <div className="learn-organism-card" key={org.id}>
                <div className="learn-card-details">
                  <div className="learn-organism-head">
                    <div className="learn-org-icon">
                      <img src={org.image} alt={org.name} />
                    </div>
                    <div className="learn-org-title-group">
                      <h3>{org.name}</h3>
                      <span className="learn-scientific-name">
                        {org.scientificName}
                      </span>
                    </div>
                  </div>

                  <div className="learn-classification-badge">
                    {org.classification}
                  </div>

                  <div className="learn-stats-row">
                    <span className="learn-time-pill">{org.hours} Hours</span>
                  </div>
                </div>

                <button
                  className="learn-btn-primary"
                  onClick={() => handleOrganismClick(org)}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;