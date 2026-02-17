// src/data/kingdomData.js

const kingdoms = [
  {
    id: "monera",
    title: "Kingdom Monera",
    label: "BACTERIA", // Visual label for the chart
    color: "#A8DADC",  // Light Blue
    icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767847552/bacteria_k8yvy1.png",
    short: "Prokaryotic, unicellular organisms",
    details: `
• Prokaryotic cells
• No true nucleus
• Binary fission
• Cell wall present
• Oldest life forms

Examples:
Bacteria, Cyanobacteria, Archaebacteria`
  },
  {
    id: "protista",
    title: "Kingdom Protista",
    label: "PROTISTS",
    color: "#F4A261", // Orange
    icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767848520/protista_ozgbo9.png",
    short: "Eukaryotic, mostly unicellular",
    details: `
• True nucleus
• Flagella/cilia for movement
• Autotrophic or heterotrophic
• Sexual & asexual reproduction

Examples:
Amoeba, Paramecium, Euglena`
  },
  {
    id: "fungi",
    title: "Kingdom Fungi",
    label: "FUNGI",
    color: "#B7E4C7", // Green
    icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767848699/fungi_lf0jgp.png",
    short: "Saprophytic, spore-forming",
    details: `
• Cell wall made of chitin
• Absorptive nutrition
• No chlorophyll
• Mostly multicellular

Examples:
Mushrooms, Yeast, Rhizopus`
  },
  {
    id: "plantae",
    title: "Kingdom Plantae",
    label: "PLANTS",
    color: "#F9C6D3", // Pink
    icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767848840/plant_nsqucy.png",
    short: "Photosynthetic, multicellular",
    details: `
• Chloroplast present
• Cell wall of cellulose
• Autotrophic
• Alternation of generations

Examples:
Ferns, Gymnosperms, Angiosperms`
  },
  {
    id: "animalia",
    title: "Kingdom Animalia",
    label: "ANIMALS",
    color: "#CDB4DB", // Purple
    icon: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767849129/animal_jgxujk.png",
    short: "Multicellular, ingestive heterotrophs",
    details: `
• No cell wall
• Nervous system developed
• Sexual reproduction
• High specialization

Examples:
Insects, Birds, Mammals (Humans)`
  }
];

export default kingdoms;