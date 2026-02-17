import React, { useState } from 'react';
import './HoneyBee.css';

const HoneyBeePage = () => {
  // Simple state to track quiz interaction (optional enhancement)
  const handleQuizAnswer = (isCorrect, message) => {
    alert(message);
  };

  return (
    <div className="page-wrapper">

      {/* Navigation */}
      <section className="honey-hero-banner">
        <div className="honey-hero-container">
          <div className="honey-hero-content">
            <span className="honey-taxonomy-tag">Phylum Arthropoda | Insecta</span>
            <h1 className="honey-hero-title">Honey Bee</h1>
            <p className="honey-hero-subtitle">Apis mellifera</p>

            <div className="honey-taxonomy-grid">
              <div className="honey-tax-item">
                <span className="honey-tax-label">Social Structure</span>
                <span className="honey-tax-value">Eusocial</span>
              </div>
              <div className="honey-tax-item">
                <span className="honey-tax-label">Diet</span>
                <span className="honey-tax-value">Nectar & Pollen</span>
              </div>
              <div className="honey-tax-item">
                <span className="honey-tax-label">Role</span>
                <span className="honey-tax-value">Pollinator</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--honey-text-secondary)' }}>
              <p>Social insects living in well-organized colonies. Vital for pollination and known for producing honey, wax, and royal jelly.</p>
            </div>
          </div>

          <div className="honey-hero-visual">
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771315768/WhatsApp_Image_2026-02-17_at_13.38.32_wwed7p.jpg"
              alt="Honey Bee"
              className="honey-hero-img"
            />
          </div>
        </div>

        <div
          className="honey-scroll-indicator"
          onClick={() => {
            const content = document.querySelector('.container');
            if (content) content.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="honey-mouse"><div className="honey-wheel"></div></div>
          <div className="honey-arrow-down"></div>
        </div>
      </section>

      <div className="container">

        {/* Introduction Section [cite: 3] */}

        <header className="intro-section">
          <h2 className="section-title">Introduction to Honey Bees</h2>
          <ul className="info-list">
            <li>Honey bees are <strong>social insects</strong> that live together in well-organized colonies.</li>
            <li>Each colony functions as a single unit where every bee has a specific role.</li>
            <li>They are vital for <strong>pollination</strong>, helping plants reproduce.</li>
            <li>They produce honey, wax, royal jelly, and propolis for human use.</li>
          </ul>
        </header>

        {/* Interactive Cards Grid [cite: 8, 9] */}
        <section className="card-grid">

          {/* Queen Card [cite: 10-14] */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-img-wrapper">
                  {/* Replace src below with "/public/queenbee.jpeg" */}
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.01.26_jon4qf.jpg"
                    alt="Queen Bee"
                    className="card-img"
                  />
                </div>
                <h3 className="card-front-title">Queen Bee</h3>
                <span className="tap-hint">Hover/Tap to Flip</span>
              </div>
              <div className="flip-card-back">
                <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>The Queen</h3>
                <ul className="back-list">
                  <li>Only fertile female (Diploid 2n).</li>
                  <li>Main function: Laying eggs.</li>
                  <li>Lays both fertilized & unfertilized eggs.</li>
                  <li>Controls reproduction using the <strong>Spermatheca</strong>.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Worker Card [cite: 15-24] */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-img-wrapper">
                  {/* Replace src below with "/public/workerbee.jpeg" */}
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313870/WhatsApp_Image_2026-02-17_at_13.00.44_myuf1c.jpg"
                    alt="Worker Bee"
                    className="card-img"
                  />
                </div>
                <h3 className="card-front-title">Worker Bee</h3>
                <span className="tap-hint">Hover/Tap to Flip</span>
              </div>
              <div className="flip-card-back">
                <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>The Worker</h3>
                <ul className="back-list">
                  <li>Sterile females (Diploid 2n)[cite: 16].</li>
                  <li>Produced from fertilized eggs[cite: 17].</li>
                  <li><strong>Duties:</strong> Collecting nectar/pollen, making honey, feeding larvae, cleaning hive .</li>
                  <li>They do not reproduce[cite: 24].</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Drone Card [cite: 25-29] */}

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-img-wrapper">
                  {/* Replace src below with "/public/dronebee.jpeg" */}
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771313874/WhatsApp_Image_2026-02-17_at_13.01.07_eez7i6.jpg"
                    alt="Drone Bee"
                    className="card-img"
                  />
                </div>
                <h3 className="card-front-title">Drone Bee</h3>
                <span className="tap-hint">Hover/Tap to Flip</span>
              </div>
              <div className="flip-card-back">
                <h3 style={{ marginBottom: '1rem', color: '#FFD700' }}>The Drone</h3>
                <ul className="back-list">
                  <li>Male bees (Haploid n).</li>
                  <li>Develop from <strong>unfertilized</strong> eggs.</li>
                  <li>Only function: Mate with the Queen.</li>
                  <li>Dies immediately after mating.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparative Table Section */}
        <section className="content-block" style={{ borderTopColor: '#38B2AC' }}>
          <span className="tag" style={{ background: '#E6FFFA', color: '#285E61' }}>Quick Comparison</span>
          <h2 className="section-title">Colony Roles & Genetics</h2>

          <div className="table-container">
            <table className="bee-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Sex</th>
                  <th>Ploidy</th>
                  <th>Origin</th>
                  <th>Key Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Queen</strong></td>
                  <td>Female</td>
                  <td><span className="status-badge status-diploid">Diploid (2n)</span></td>
                  <td>Fertilized Egg</td>
                  <td>Reproduction</td>
                </tr>
                <tr>
                  <td><strong>Worker</strong></td>
                  <td>Female</td>
                  <td><span className="status-badge status-diploid">Diploid (2n)</span></td>
                  <td>Fertilized Egg</td>
                  <td>Work/Foraging</td>
                </tr>
                <tr>
                  <td><strong>Drone</strong></td>
                  <td>Male</td>
                  <td><span className="status-badge status-haploid">Haploid (n)</span></td>
                  <td>Unfertilized Egg</td>
                  <td>Mating </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Reproductive System Section [cite: 30-36] */}

        <section className="content-block">
          <span className="tag">Genetics</span>
          <h2 className="section-title">Reproductive System</h2>

          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            Honey bees exhibit a unique <strong>Haplodiploid</strong> system of sex determination.The sex of the bee depends entirely on whether the egg is fertilized.
          </p>

          <div className="concept-grid">
            <div className="concept-card">
              <span className="concept-title">Female Bees (Queen/Worker)</span>
              Develop from <strong>Fertilized Eggs</strong>.<br />
              They have two sets of chromosomes.<br />
              <strong>Status:</strong> Diploid (2n = 32)
            </div>
            <div className="concept-card">
              <span className="concept-title">Male Bees (Drones)</span>
              Develop from <strong>Unfertilized Eggs</strong>.<br />
              They have one set of chromosomes.<br />
              <strong>Status:</strong> Haploid (n = 16)
            </div>
          </div>
        </section>

        {/* Parthenogenesis Section  */}
        <section className="content-block">
          <span className="tag">Key Mechanism</span>
          <h2 className="section-title">Parthenogenesis</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                Parthenogenesis is a form of reproduction where an egg develops into an embryo <strong>without fertilization</strong>.
              </p>
              <ul className="info-list">
                <li>Common in insects like bees, ants, and wasps.</li>
                <li>In honey bees, this process produces only <strong>Male Drones</strong>.</li>
                <li>Allows the colony to produce males quickly to ensure mating opportunities.</li>
              </ul>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <div className="concept-card" style={{ height: '100%', borderColor: '#F56565' }}>
                <span className="concept-title" style={{ color: '#C53030' }}> Parthenogenesis in Honey bee</span>

                <ul style={{ marginTop: '1rem', listStyle: 'circle', paddingLeft: '1.2rem' }}>
                  <li>Queen lays unfertilized egg intentionally.</li>
                  <li>These develop directly into Drones[cite: 43].</li>
                  <li><strong>Formula:</strong> Unfertilized Egg → Male (n).</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="note-box">
            💡 <strong>Memory Tip:</strong> Parthenogenesis = Quick Males + Energy Saving + Colony Survival.
          </div>
        </section>

        {/* Gamified Quiz Section */}
        {/* <section className="quiz-container">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Knowledge Check 🧠</h2>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
                Which bee develops from an unfertilized egg?
            </p>
            
            <div className="quiz-options">
                <button 
                    className="quiz-btn" 
                    onClick={() => handleQuizAnswer(false, '❌ Incorrect. Workers come from fertilized eggs!')}
                >
                    Worker Bee
                </button>
                
                <button 
                    className="quiz-btn" 
                    onClick={() => handleQuizAnswer(true, '✅ Correct! Drones are haploid (n) and come from unfertilized eggs.')}
                >
                    Drone Bee
                </button>
                
                <button 
                    className="quiz-btn" 
                    onClick={() => handleQuizAnswer(false, '❌ Incorrect. The Queen comes from a fertilized egg.')}
                >
                    Queen Bee
                </button>
            </div> 
        </section> */}

      </div>
    </div>
  );
};

export default HoneyBeePage;