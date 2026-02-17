import React, { useState } from 'react';
import './TaxonomyPage.css';

const TaxonomyPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('domain');
  
  const taxonomicLevels = [
    {
      id: 'domain',
      name: 'Domain',
      shortDescription: 'Broadest category of life',
      longDescription: 'The highest taxonomic rank of organisms in the three-domain system. There are three domains: Archaea, Bacteria, and Eukarya.',
      examples: ['Eukarya', 'Bacteria', 'Archaea'],
      keyPoint: 'The broadest classification level, grouping organisms based on fundamental cellular differences.',
      mnemonic: 'D - Dear',
      color: '#8b5cf6' // Violet
    },
    {
      id: 'kingdom',
      name: 'Kingdom',
      shortDescription: 'Major groups of organisms',
      longDescription: 'The second highest taxonomic rank. Organisms are grouped into kingdoms based on general characteristics like cell structure and nutrition.',
      examples: ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Monera'],
      keyPoint: 'Divides organisms into major groups like animals, plants, and fungi.',
      mnemonic: 'K - King',
      color: '#ec4899' // Pink
    },
    {
      id: 'phylum',
      name: 'Phylum',
      shortDescription: 'Major body plans',
      longDescription: 'Groups organisms based on general body plan or organization. Contains one or more classes.',
      examples: ['Chordata', 'Arthropoda', 'Mollusca', 'Annelida', 'Echinodermata'],
      keyPoint: 'Focuses on fundamental anatomical and developmental characteristics.',
      mnemonic: 'P - Philip',
      color: '#3b82f6' // Blue
    },
    {
      id: 'class',
      name: 'Class',
      shortDescription: 'Groups within phylum',
      longDescription: 'A taxonomic rank below phylum and above order. Groups together orders of organisms with common characteristics.',
      examples: ['Mammalia', 'Aves', 'Reptilia', 'Amphibia', 'Insecta'],
      keyPoint: 'Further divides phyla into more specific groups with shared traits.',
      mnemonic: 'C - Came',
      color: '#06b6d4' // Cyan
    },
    {
      id: 'order',
      name: 'Order',
      shortDescription: 'Groups within class',
      longDescription: 'A taxonomic rank below class and above family. Groups together families of organisms with common characteristics.',
      examples: ['Primates', 'Carnivora', 'Rodentia', 'Chiroptera', 'Artiodactyla'],
      keyPoint: 'Organizes classes into groups with similar behavioral and morphological traits.',
      mnemonic: 'O - Over',
      color: '#4ade80' // Green
    },
    {
      id: 'family',
      name: 'Family',
      shortDescription: 'Groups of related genera',
      longDescription: 'A taxonomic rank below order and above genus. Contains one or more genera that share a set of common characteristics.',
      examples: ['Hominidae', 'Felidae', 'Canidae', 'Ursidae', 'Cervidae'],
      keyPoint: 'Groups together genera that share a relatively recent common ancestor.',
      mnemonic: 'F - For',
      color: '#fbbf24' // Amber
    },
    {
      id: 'genus',
      name: 'Genus',
      shortDescription: 'Groups of related species',
      longDescription: 'A taxonomic rank below family and above species. Contains one or more species that are closely related.',
      examples: ['Homo', 'Panthera', 'Canis', 'Ursus', 'Quercus'],
      keyPoint: 'The first part of a scientific name (binomial nomenclature).',
      mnemonic: 'G - Good',
      color: '#f97316' // Orange
    },
    {
      id: 'species',
      name: 'Species',
      shortDescription: 'Specific organisms',
      longDescription: 'The basic unit of biological classification. A group of organisms that can interbreed and produce fertile offspring.',
      examples: ['Homo sapiens', 'Panthera leo', 'Canis lupus', 'Ursus arctos', 'Quercus alba'],
      keyPoint: 'The most specific classification level. Uses binomial nomenclature (Genus + species).',
      mnemonic: 'S - Soup',
      color: '#ef4444' // Red
    }
  ];

  const selectedLevelData = taxonomicLevels.find(level => level.id === selectedLevel);

  return (
    <div className="tp-taxonomy-page">
      <div className="tp-container">
        
        {/* Header */}
        <header className="tp-page-header">
          <h1 className="tp-page-title">Taxonomic Hierarchy</h1>
          <p className="tp-page-subtitle">Interactive Classification Pyramid</p>
        </header>

        <div className="tp-content-wrapper">
          
          {/* LEFT SIDE: PYRAMID & MNEMONIC */}
          <div className="tp-pyramid-section">
            <div className="tp-pyramid-wrapper">
              
              {/* The Pyramid Visual */}
              <div className="tp-pyramid-visual">
                {taxonomicLevels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`tp-pyramid-tier ${selectedLevel === level.id ? 'tp-tier-active' : ''}`}
                    onClick={() => setSelectedLevel(level.id)}
                    style={{
                      '--tier-color': level.color,
                      /* Decreasing width to create the V shape */
                      '--width-percent': `${100 - (index * 9)}%`, 
                      '--z-index': 10 - index
                    }}
                  >
                    <div className="tp-tier-glass">
                      <span className="tp-tier-name">{level.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrated Mnemonic (Below Pyramid) */}
              <div className="tp-mnemonic-card">
                <div className="tp-mnemonic-header">
                  <span className="tp-mnemonic-icon">💡</span> Remember with Mnemonic
                </div>
                <div className="tp-mnemonic-sentence">
                  <span className="tp-m-word"><b style={{color: '#8b5cf6'}}>D</b>ear</span>
                  <span className="tp-m-word"><b style={{color: '#ec4899'}}>K</b>ing</span>
                  <span className="tp-m-word"><b style={{color: '#3b82f6'}}>P</b>hilip</span>
                  <span className="tp-m-word"><b style={{color: '#06b6d4'}}>C</b>ame</span>
                  <span className="tp-m-word"><b style={{color: '#4ade80'}}>O</b>ver</span>
                  <span className="tp-m-word"><b style={{color: '#fbbf24'}}>F</b>or</span>
                  <span className="tp-m-word"><b style={{color: '#f97316'}}>G</b>ood</span>
                  <span className="tp-m-word"><b style={{color: '#ef4444'}}>S</b>oup</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: DETAIL CARD */}
          <div className="tp-detail-section">
            <div className="tp-level-detail-card" style={{'--accent-color': selectedLevelData.color}}>
              
              <div className="tp-detail-header">
                <div className="tp-header-content">
                  <span className="tp-level-badge">Level {taxonomicLevels.indexOf(selectedLevelData) + 1}</span>
                  <h2 className="tp-level-title">{selectedLevelData.name}</h2>
                  <p className="tp-level-short">{selectedLevelData.shortDescription}</p>
                </div>
                {/* Large semi-transparent background letter */}
                <div className="tp-header-bg-letter">{selectedLevelData.name.charAt(0)}</div>
              </div>

              <div className="tp-detail-body">
                <div className="tp-info-block">
                  <h4 className="tp-info-label">Definition</h4>
                  <p className="tp-info-text">{selectedLevelData.longDescription}</p>
                </div>

                <div className="tp-info-block">
                  <h4 className="tp-info-label">Key Point</h4>
                  <div className="tp-key-point-box">
                    {selectedLevelData.keyPoint}
                  </div>
                </div>

                <div className="tp-info-block">
                  <h4 className="tp-info-label">Common Examples</h4>
                  <div className="tp-tags-container">
                    {selectedLevelData.examples.map((ex, i) => (
                      <span key={i} className="tp-example-pill">{ex}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaxonomyPage;