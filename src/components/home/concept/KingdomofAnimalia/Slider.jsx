import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Slider.css';

const phylaData = [
  { id: 1, title: "PHYLUM 1", name: "Porifera", des: "Commonly known as sponges. These are primitive, multicellular, marine animals with a porous body that filters water to obtain food and oxygen.", img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1772615599/3_cwhkym.png", theme: "#fbbf24" },
  { id: 2, title: "PHYLUM 2", name: "Coelenterata", des: "Also known as Cnidaria (like Jellyfish and Corals). They are aquatic, mostly marine, with tentacles equipped with stinging cells called cnidoblasts.", img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1772694257/2_cariks.png", theme: "#3b82f6" },
  { id: 3, title: "PHYLUM 3", name: "Ctenophora", des: "Commonly known as sea walnuts or comb jellies. They are exclusively marine and move using eight external rows of ciliated comb plates.", img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1772616848/2_colgrm.png", theme: "#c084fc" },
  { id: 4, title: "PHYLUM 4", name: "Platyhelminthes", des: "The flatworms. They have a dorso-ventrally flattened body and are mostly endoparasites found in animals, including humans.", img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1772615597/1_diq3sg.png", theme: "#ef4444" },
  { id: 5, title: "PHYLUM 5", name: "Aschelminthes", des: "The roundworms (Nematoda). Their body is circular in cross-section. They can be free-living, aquatic, terrestrial, or parasitic.", img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1772616756/aschehel-Photoroom_dhrfql.png", theme: "#84cc16" },
  { id: 6, title: "PHYLUM 6", name: "Annelida", des: "Segmented worms like earthworms and leeches. Their body surface is distinctly marked out into segments or metameres.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Earthworm_transparent.png/512px-Earthworm_transparent.png", theme: "#d97706" },
  { id: 7, title: "PHYLUM 7", name: "Arthropoda", des: "The largest phylum, including insects, spiders, and crustaceans. They have jointed appendages and a hard chitinous exoskeleton.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cancer_pagurus_transparent_background.png/512px-Cancer_pagurus_transparent_background.png", theme: "#f97316" },
  { id: 8, title: "PHYLUM 8", name: "Mollusca", des: "The second largest animal phylum (snails, octopuses). They are soft-bodied animals usually covered by a calcareous shell.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Octopus_transparent.png/512px-Octopus_transparent.png", theme: "#0ea5e9" },
  { id: 9, title: "PHYLUM 9", name: "Echinodermata", des: "Spiny-bodied animals like starfish and sea urchins. They have an endoskeleton of calcareous ossicles and a unique water vascular system.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Asterias_rubens_transparent.png/512px-Asterias_rubens_transparent.png", theme: "#ec4899" },
  { id: 10, title: "PHYLUM 10", name: "Hemichordata", des: "A small group of worm-like marine animals, such as acorn worms. They have a cylindrical body composed of an anterior proboscis, a collar, and a trunk.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Balanoglossus_transparent.png/512px-Balanoglossus_transparent.png", theme: "#14b8a6" },
  { id: 11, title: "PHYLUM 11", name: "Chordata", des: "Animals with a notochord, a dorsal hollow nerve cord, and paired pharyngeal gill slits. This includes all vertebrates (fish, amphibians, reptiles, birds, mammals).", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Panthera_tigris_tigris_transparent.png/512px-Panthera_tigris_tigris_transparent.png", theme: "#8b5cf6" }
];

const Slider = ({ onPhylumChange }) => {
  const [active, setActive] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const imageRefs = useRef([]);

  // --- COMMUNICATE WITH PARENT ---
  useEffect(() => {
    if (onPhylumChange) {
      onPhylumChange(phylaData[active].name);
    }
  }, [active, onPhylumChange]);

  // --- NAVIGATION LOGIC ---
  const nextSlide = useCallback(() => setActive((prev) => (prev + 1 < phylaData.length ? prev + 1 : 0)), []);
  const prevSlide = useCallback(() => setActive((prev) => (prev - 1 >= 0 ? prev - 1 : phylaData.length - 1)), []);

  // --- KEYBOARD NAVIGATION (Accessibility) ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // --- SWIPE LOGIC ---
  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide(); 
    if (touchStartX - touchEndX < -50) prevSlide(); 
  };

  // --- 3D MOUSE TRACKING LOGIC ---
  const handleMouseMove = (e, index) => {
    if (index !== active) return;
    const el = imageRefs.current[index];
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; 
    const y = (e.clientY - top - height / 2) / 25;
    
    el.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.1)`;
  };

  const handleMouseLeave = (index) => {
    const el = imageRefs.current[index];
    if (el) el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  // --- SCROLL TO CONTENT LOGIC ---
  const handleExploreClick = () => {
    // Scrolls the window down by roughly the height of the slider viewport to reveal content below
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <div 
      className="slider" 
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd}
      style={{ '--theme-color': phylaData[active] ? phylaData[active].theme : '#333' }}
    >
      <div className="bg-glow"></div>

      <button className="nav-triangle prev" onClick={prevSlide} aria-label="Previous Phylum">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon points="17,4 6,12 17,20" strokeLinejoin="round" />
        </svg>
      </button>
      
      <button className="nav-triangle next" onClick={nextSlide} aria-label="Next Phylum">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon points="7,4 18,12 7,20" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="list">
        {phylaData.map((item, index) => {
          let className = "item";
          if (index === active) className += " active";
          else if (index === (active + 1 < phylaData.length ? active + 1 : 0)) className += " next";
          else className += " hidden";

          return (
            <div key={item.id} className={className}>
              <div className="content">
                <div className="title-wrapper"><div className="title">{item.title}</div></div>
                <div className="name-wrapper"><div className="name">{item.name}</div></div>
                <div className="des-wrapper"><div className="des">{item.des}</div></div>
                <div className="btn-wrapper">
                  <button className="explore-btn" onClick={handleExploreClick}>
                    <span>View Anatomy</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
              
              <div 
                className="image-box"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <img 
                  ref={el => imageRefs.current[index] = el}
                  src={item.img} 
                  alt={item.name}
                  className="phylum-png" 
                  onError={(e) => {
                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
