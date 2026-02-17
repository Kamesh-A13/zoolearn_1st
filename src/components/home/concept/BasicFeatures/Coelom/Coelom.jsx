import React, { memo } from "react";
import "./Coelom.css";

// Importing local images
import imgAcoelomate from "./TriploblasticAcoelomate.png";
import imgPseudo from "./TriploblasticPseudocoelomate.png";
import imgEucoelomate from "./TriploblasticEucoelomate.png";
import imgSchizo from "./Schizocoelom.png";
import imgEntero from "./Enterocoelom.png";

// Fallback image
const FALLBACK_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Coelomates.svg/512px-Coelomates.svg.png";

// --- DATA: TYPES OF COELOM ---
const COELOM_TYPES = [
  {
    id: "acoelomate",
    title: "Triploblastic Acoelomate",
    description: "These animals do not contain any space between their body wall and gut.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767626839/TriploblasticAcoelomate_twtml1.png"
  },
  {
    id: "pseudo",
    title: "Triploblastic Pseudocoelomate",
    description: "These animals have a false body cavity, a fluid-filled space separating the gut from the body wall.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767626852/TriploblasticPseudocoelomate_gecq6s.png"
  },
  {
    id: "eucoelomate",
    title: "Triploblastic Eucoelomate",
    description: "These animals have a true coelom lined by mesoderm on both sides.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767626849/TriploblasticEucoelomate_z2rhpi.png"
  }
];

// --- DATA: FORMATION MECHANISMS ---
const FORMATION_TYPES = [
  {
    id: "schizo",
    title: "Schizocoelom",
    summary: "Forms by Splitting of Mesoderm",
    image:"https://res.cloudinary.com/duibfmcw1/image/upload/v1767626840/Schizocoelom_elzmax.png",
    points: [
      "In some animals, the middle embryonic layer (mesoderm) first appears as a solid mass.",
      "Later, this solid mesoderm splits from the inside, creating an empty space.",
      "This space becomes the body cavity, called a schizocoelom."
    ],
    extraNote: {
      title: "Haemocoel",
      text: "In animals like arthropods (insects, crabs) and many molluscs, this body cavity is mostly filled with blood. Such a blood-filled cavity is called a haemocoel, and organs float in it."
    }
  },
  {
    id: "entero",
    title: "Enterocoelom",
    summary: "Forms from Gut Pouches",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767626836/Enterocoelom_wavgqj.png",
    points: [
      "In some other animals, the body cavity forms in a different and more organized way.",
      "During early development, the primitive gut (archenteron) forms small outward bulges or pouches.",
      "These pouches separate from the gut and develop into the mesoderm, enclosing a space inside.",
      "This space becomes a true coelom, called an enterocoelom, and it is completely lined by mesoderm."
    ],
    extraNote: null
  }
];

// --- COMPONENT: TYPES CARD ---
const CoelomCard = memo(({ title, description, image }) => (
  <article className="coelom-card">
    <div className="coelom-visual-box">
      <img 
        src={image || FALLBACK_IMG} 
        alt={title} 
        className="coelom-img"
        onError={(e) => { e.target.src = FALLBACK_IMG; }}
      />
    </div>
    <div className="coelom-content">
      <h3 className="coelom-card-title">{title}</h3>
      <p className="coelom-text">{description}</p>
    </div>
  </article>
));
CoelomCard.displayName = "coelom-CoelomCard";

// --- COMPONENT: FORMATION CARD (UPGRADED) ---
const FormationCard = memo(({ title, summary, image, points, extraNote }) => (
  <article className="coelom-formation-card">
    <div className="coelom-formation-header">
      <h3 className="coelom-formation-title">{title}</h3>
      <span className="coelom-formation-badge">{summary}</span>
    </div>
    
    <div className="coelom-formation-body">
      {/* Visual Side */}
      <div className="coelom-formation-visual">
        <figure className="coelom-formation-figure">
          <img 
            src={image || FALLBACK_IMG} 
            alt={title} 
            className="coelom-formation-img" 
            onError={(e) => { e.target.src = FALLBACK_IMG; }}
          />
        </figure>
      </div>
      
      {/* Content Side */}
      <div className="coelom-formation-details">
        <ol className="coelom-formation-steps">
          {points.map((pt, i) => (
            <li key={i} className="coelom-step-item">
              <span className="coelom-step-text">{pt}</span>
            </li>
          ))}
        </ol>
        
        {extraNote && (
          <div className="coelom-formation-note">
            <div className="coelom-note-icon">💡</div>
            <div className="coelom-note-content">
              <strong>{extraNote.title}:</strong> {extraNote.text}
            </div>
          </div>
        )}
      </div>
    </div>
  </article>
));
FormationCard.displayName = "FormationCard";

// --- MAIN COMPONENT ---
export default function Coelom() {
  return (
    <section className="coelom-section" aria-label="Coelom and Body Cavities">
      <div className="coelom-container">
        
        {/* HEADER */}
        <header className="coelom-header">
          <h2 className="coelom-main-title">Coelom (Body Cavity)</h2>
          <div className="coelom-underline"></div>
          <p className="coelom-intro">
            A body cavity arises from the embryonic mesoderm. 
            The mesoderm provides a cellular lining called the <strong>coelomic epithelium</strong> or <strong>peritoneum</strong>.
          </p>
        </header>

        {/* SECTION 1: CLASSIFICATION BY CAVITY */}
        <div className="coelom-grid">
          {COELOM_TYPES.map((type) => (
            <CoelomCard 
              key={type.id}
              title={type.title}
              description={type.description}
              image={type.image}
            />
          ))}
        </div>

        {/* SECTION 2: FORMATION MECHANISMS */}
        <div className="coelom-formation-section">
          <div className="coelom-formation-divider">
            <span>Formation Mechanisms</span>
          </div>
          
          <div className="coelom-formation-grid">
            {FORMATION_TYPES.map((type) => (
              <FormationCard 
                key={type.id}
                title={type.title}
                summary={type.summary}
                image={type.image}
                points={type.points}
                extraNote={type.extraNote}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}