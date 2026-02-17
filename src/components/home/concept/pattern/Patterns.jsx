import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUp } from 'lucide-react';
import { ScrollReveal } from '../../../shared/ScrollReveal';
import './Patterns.css';

const Patterns = () => {
  const [activeTab, setActiveTab] = useState('digestive');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 13vh)');
  const [showSidebar, setShowSidebar] = useState(false); // NEW: Control sidebar visibility
  const [showBackToTop, setShowBackToTop] = useState(false); // Back to top button visibility
  const sidebarRef = useRef(null);


  //Scroll-based sidebar visibility and back to top button
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.patt-hero-banner');
      const scrollPosition = window.scrollY;

      // Show sidebar when scrolled past 70% of banner
      if (banner) {
        const bannerBottom = banner.offsetHeight;
        setShowSidebar(scrollPosition > bannerBottom * 0.7);
      }

      // Show back to top button after scrolling 400px
      setShowBackToTop(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Smoothly scroll to top of content area when tab changes
    const contentArea = document.querySelector('.patt-zoo-main-content');
    if (contentArea) {
      const headerHeight = 80;
      const elementPosition = contentArea.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Smooth animation instead of instant
      });
    }
  }, [activeTab]);

  // Track footer position and adjust sidebar height
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      if (!footer || !sidebarRef.current) return;

      const footerRect = footer.getBoundingClientRect();

      // Calculate header height dynamically from CSS variable
      const headerHeightVal = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
      let headerOffset = 0;
      if (headerHeightVal.endsWith('vh')) {
        headerOffset = window.innerHeight * (parseFloat(headerHeightVal) / 100);
      } else if (headerHeightVal.endsWith('px')) {
        headerOffset = parseFloat(headerHeightVal);
      } else {
        headerOffset = 100; // Fallback
      }

      const viewportHeight = window.innerHeight;

      // If footer is in view, shrink the sidebar
      if (footerRect.top < viewportHeight) {
        const newHeight = Math.max(footerRect.top - headerOffset, 100);
        setSidebarHeight(`${newHeight}px`);
      } else {
        // Footer not in view, sidebar takes full available height
        setSidebarHeight(`calc(100vh - ${headerHeightVal})`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const contentData = {
    digestive: {
      title: "Digestive System",
      sections: [
        {
          heading: "Overview",
          text: "The digestive system is responsible for the mechanical and chemical breakdown of food into simpler molecules that can be absorbed by the body. It is found only in Eumetazoa — animals with true tissues.",
          content: [
            "Porifera (sponges) lack a digestive tract — digestion is entirely intracellular, carried out by choanocytes and amoebocytes.",
            "From Cnidaria onwards, a distinct digestive cavity appears, and complexity increases progressively through the animal kingdom.",
            "The evolution of the digestive system mirrors the transition from intracellular digestion (inside cells) to extracellular digestion (inside a cavity)."
          ]
        },
        {
          heading: "1. Incomplete Digestive System",
          text: "An incomplete digestive system has only one opening that serves as both mouth and anus. Food enters and waste exits through the same pore — this is called a gastrovascular cavity.",
          content: [
            "Structure: A single blind-ended sac (gastrovascular cavity) with one opening.",
            "Function: The same opening performs both ingestion (taking food in) and egestion (removing undigested waste).",
            "Food movement is bidirectional — it can move in both directions inside the cavity.",
            "Digestion is partly extracellular (inside the cavity) and partly intracellular (inside the cells lining the cavity)."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768291586/incomplete_digestion_kwnrlx.png",
          imageCaption: "A gastrovascular cavity has one opening",
          examples: [
            "Coelenterata (Cnidaria) — Hydra, Jellyfish",
            "Platyhelminthes — Planaria, Liver fluke"
          ]
        },
        {
          heading: "2. Complete Digestive System",
          text: "A complete digestive system has two separate openings — a mouth at the anterior end and an anus (or cloaca) at the posterior end. This forms a continuous tube called the alimentary canal.",
          content: [
            "Structure: A tube-like alimentary canal with distinct mouth and anus.",
            "Function: Food moves in one direction only (unidirectional flow), greatly increasing digestive efficiency.",
            "The canal becomes increasingly specialised — different regions (e.g. oesophagus, stomach, intestine) perform different functions.",
            "Peristalsis (wave-like muscle contractions) moves food along the canal.",
            "Accessory glands (salivary glands, liver, pancreas) appear in higher animals, adding digestive juices."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768291536/complete_digestion_obd4zg.png",
          imageCaption: "An alimentary canal has two openings — mouth and anus",
          examples: [
            "Aschelminthes (Nematoda) — Ascaris",
            "Annelida — Earthworm (with specialised regions: pharynx, crop, gizzard)",
            "Arthropoda — Cockroach, Crab",
            "Chordata — Frog, Rabbit, Humans"
          ]
        },
        {
          heading: "Key Concept: Increasing Specialisation",
          text: "As animals evolved, the alimentary canal developed specialised regions. In earthworms, you can already see a distinct pharynx, oesophagus, crop (storage), gizzard (grinding), and intestine. In vertebrates, the stomach and intestine become highly specialised with enzymes, villi, and accessory glands.",
          customContent: (
            <div className="patt-did-you-know">
              <div className="patt-did-you-know-title">Did You Know?</div>
              <div className="patt-did-you-know-content">
                Ruminants like cows have a four-chambered stomach (rumen, reticulum, omasum, abomasum) — the most complex digestive specialisation in the animal kingdom. This allows them to digest cellulose with the help of symbiotic microorganisms.
              </div>
            </div>
          )
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Feature", "Incomplete Digestive System", "Complete Digestive System"],
            rows: [
              ["Number of openings", "One opening only", "Two separate openings (mouth + anus)"],
              ["Cavity type", "Gastrovascular cavity", "Alimentary canal (tube)"],
              ["Mouth", "Same opening acts as mouth", "Mouth present at anterior end"],
              ["Anus", "Absent (same opening used)", "Anus or cloaca present at posterior end"],
              ["Direction of food movement", "Bidirectional", "Unidirectional"],
              ["Efficiency", "Less efficient (mixing of food & waste)", "Highly efficient (sequential processing)"],
              ["Specialisation", "No distinct regions", "Distinct regions (oesophagus, stomach, intestine)"],
              ["Digestion type", "Intracellular + partly extracellular", "Extracellular (inside the canal)"],
              ["Accessory glands", "Absent", "Present in higher forms (liver, pancreas)"],
              ["Examples (Phyla)", "Coelenterata, Platyhelminthes", "Aschelminthes to Chordata"]
            ]
          }
        }
      ]
    },
    respiratory: {
      title: "Respiratory System",
      sections: [
        {
          heading: "Overview",
          text: "Respiration is the process by which organisms exchange gases — taking in oxygen (O₂) for cellular metabolism and releasing carbon dioxide (CO₂) as a waste product. The type of respiratory organ depends on the animal's habitat, body size, and level of organisation.",
          content: [
            "All respiratory surfaces share two features: they are thin (for easy diffusion) and moist (gases dissolve in water before crossing membranes).",
            "In simple animals, the body surface itself is sufficient. In larger, more active animals, specialised respiratory organs evolved to increase the surface area available for gas exchange.",
            "The driving force is always diffusion — gases move from regions of higher partial pressure to lower partial pressure (Fick's Law)."
          ]
        },
        {
          heading: "Body Surface Respiration",
          text: "The simplest form of respiration. Gas exchange occurs directly through the general body surface by simple diffusion. No specialised respiratory organs are needed.",
          content: [
            "The body wall must be thin and permeable to gases.",
            "Oxygen dissolves in the moisture on the body surface and diffuses inward; CO₂ diffuses outward.",
            "Only works in small or flattened animals with a high surface-area-to-volume ratio."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293404/body_surface_respiration_glucgw.png",
          examples: [
            "Porifera (sponges) — through the entire body surface",
            "Cnidaria — through the body wall and gastrodermis",
            "Platyhelminthes — flattened body increases surface area"
          ]
        },
        {
          heading: "Cutaneous Respiration",
          text: "Respiration through the skin. The skin must be thin, moist, and richly supplied with blood capillaries to allow efficient gas exchange.",
          content: [
            "Skin glands secrete mucus to keep the surface moist at all times.",
            "Blood flowing through dermal capillaries picks up O₂ and releases CO₂.",
            "Often supplemented by other respiratory modes (lungs, buccopharyngeal cavity)."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293431/cutaneous_respiration_hq9bzq.png",
          examples: [
            "Annelida — Earthworm (skin kept moist by coelomic fluid)",
            "Amphibia — Frog (skin respiration is dominant during hibernation)"
          ]
        },
        {
          heading: "Branchial Respiration",
          text: "Respiration using gills — highly vascularised, feathery outgrowths that extract dissolved oxygen from water. Gills provide an enormous surface area packed into a small space.",
          content: [
            "Gills may be external (exposed, e.g. in larval amphibians) or internal (protected by an operculum in bony fishes).",
            "Water flows over the gill filaments, and oxygen diffuses into the blood while CO₂ diffuses out.",
            "Counter-current flow in fish gills maximises oxygen extraction — water flows in one direction and blood flows in the opposite direction."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293422/branchial_respiration_fnxxn5.png",
          examples: [
            "Arthropoda — Crustacea (book gills in Limulus, gills in crabs)",
            "Mollusca — Ctenidia (comb-like gills in Pila, Octopus)",
            "Chordata — Pisces (internal gills with operculum)"
          ]
        },
        {
          heading: "Tracheal Respiration",
          text: "A unique system found in insects. Air enters through small pores called spiracles on the body surface, and is carried directly to the tissues through a branching network of air tubes called tracheae.",
          content: [
            "Tracheae branch into finer tracheoles that reach every cell directly.",
            "Blood (haemolymph) does NOT transport oxygen — gases are delivered directly by the tracheae.",
            "This is the most efficient respiratory system for small terrestrial animals, allowing rapid gas exchange.",
            "Ventilation is aided by rhythmic body movements that pump air in and out."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293447/tracheal_respiration_xri7am.png",
          examples: [
            "Arthropoda — Insecta (cockroach, grasshopper, beetle)"
          ]
        },
        {
          heading: "Pulmonary Respiration",
          text: "Respiration through lungs — internal, sac-like organs with a large, moist surface area that is richly vascularised. Lungs became the dominant respiratory organ in terrestrial vertebrates.",
          content: [
            "Air is drawn in through the nose/mouth and travels via the trachea, bronchi, and bronchioles to the alveoli (in mammals).",
            "Gas exchange occurs across the thin alveolar walls — O₂ enters the blood, and CO₂ is expelled.",
            "Lung complexity increases from amphibians (simple sac-like lungs) → reptiles (partially septate) → mammals (highly alveolar, maximising surface area).",
            "Birds have a unique flow-through lung system with air sacs, allowing continuous gas exchange during both inhalation and exhalation."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293439/Pulmonary_Respiration_yko92j.png",
          examples: [
            "Amphibia — simple sac-like lungs (supplemented by skin)",
            "Reptilia — more complex, partially divided lungs",
            "Aves — parabronchi + air sacs (most efficient vertebrate lungs)",
            "Mammalia — highly alveolar lungs (e.g. ~300 million alveoli in humans)"
          ]
        },
        {
          heading: "Buccopharyngeal Respiration",
          text: "Gas exchange through the moist, vascularised lining of the buccal (mouth) and pharyngeal cavity. This is a supplementary mode of respiration used by amphibians.",
          content: [
            "The floor of the mouth rhythmically moves up and down, ventilating the buccopharyngeal cavity.",
            "Oxygen diffuses through the thin mucosal lining into underlying blood capillaries.",
            "Used especially when the frog is at rest on land."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/w_500,q_auto,f_auto/v1768293426/buccopharyngeal_respiration_ueppcn.png",
          examples: [
            "Amphibia — Frogs (used alongside cutaneous and pulmonary respiration)"
          ]
        },
        {
          heading: "Key Concept: Evolutionary Trend",
          text: "Respiratory organs evolved from simple body surface diffusion in aquatic invertebrates to highly efficient lungs in terrestrial vertebrates. The key trend is increasing surface area, vascularisation, and protection of the respiratory surface from desiccation.",
          customContent: (
            <div className="patt-did-you-know">
              <div className="patt-did-you-know-title">Did You Know?</div>
              <div className="patt-did-you-know-content">
                The human lung has about 300 million alveoli, providing a total gas-exchange surface area of approximately 70 m² — roughly the size of half a tennis court! This enormous surface is packed inside a small thoracic cavity.
              </div>
            </div>
          )
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Type of Respiration", "Respiratory Surface / Organ", "Medium", "Habitat", "Phylum / Examples"],
            rows: [
              ["Body surface", "General body surface", "Water", "Aquatic", "Porifera, Cnidaria, Platyhelminthes"],
              ["Cutaneous", "Thin, moist, vascular skin", "Water/Air", "Moist terrestrial / Aquatic", "Annelida, Amphibia"],
              ["Branchial", "Gills (ctenidia / book gills)", "Water", "Aquatic", "Crustacea, Mollusca, Pisces"],
              ["Tracheal", "Tracheae (air tubes + spiracles)", "Air", "Terrestrial", "Insecta"],
              ["Pulmonary", "Lungs (alveolar / sac-like)", "Air", "Terrestrial", "Amphibia, Reptilia, Aves, Mammalia"],
              ["Buccopharyngeal", "Buccal cavity lining", "Air", "Amphibious", "Frog"]
            ]
          }
        }
      ]
    },
    circulatory: {
      title: "Circulatory System",
      sections: [
        {
          heading: "Overview",
          text: "The circulatory system is the internal transport network of the body. It distributes nutrients, oxygen, hormones, and immune cells to all tissues while collecting metabolic wastes for removal.",
          content: [
            "In primitive animals (Porifera, Cnidaria), there is no true circulatory system — transport occurs by water movement or diffusion.",
            "As body complexity increased, dedicated circulatory organs evolved: blood, blood vessels, and a muscular heart.",
            "The circulatory system evolved in two major stages: open circulation (blood leaves vessels and bathes tissues directly) → closed circulation (blood always remains inside vessels).",
            "In vertebrates, the heart evolved from a simple two-chambered pump in fishes to a fully four-chambered heart in birds and mammals."
          ]
        },
        {
          heading: "Type I – Without Blood (Water as Medium)",
          text: "The most primitive form of internal transport. No blood or blood vessels are present — water serves as the transport medium.",
          content: [
            "Water circulates through internal channels, carrying dissolved oxygen, nutrients, and waste.",
            "This system is adequate for small animals with limited metabolic demands."
          ]
        },
        {
          heading: "Water Canal System",
          isSubtopic: true,
          content: [
            "Present only in Porifera.",
            "Helps in feeding, respiration, excretion, and reproduction."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297422/Water_canal_system_nyjn5h.png"
        },
        {
          heading: "Gastrovascular System",
          isSubtopic: true,
          content: [
            "Present in Cnidaria and Ctenophora.",
            "Same cavity for digestion and distribution."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297413/Gastro_vascular_system_dvqyff.png"
        },
        {
          heading: "Water Vascular System",
          isSubtopic: true,
          content: [
            "Present in Echinoderms.",
            "Helps in locomotion, respiration, and feeding."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297427/Water_Vascular_System_ywsead.png"
        },
        {
          heading: "Type II – With Blood",
          content: [
            "Blood is the medium of transportation"
          ]
        },
        {
          heading: "Comparison: Open vs Closed Circulation",
          isSubtopic: true,
          customContent: (
            <>
              <div className="patt-comparison-grid">
                <div className="patt-comparison-col">
                  <strong>Open Circulatory System</strong>
                  <ul>
                    <li>Blood pumped by heart flows into open sinuses (hemocoel).</li>
                    <li>Direct contact between blood and body cells.</li>
                  </ul>
                  <div className="patt-comparison-examples">
                    <em>Examples:</em> Arthropoda (Insects, Crabs), Non-cephalopod Molluscs, Hemichordata
                  </div>
                </div>
                <div className="patt-comparison-col">
                  <strong>Closed Circulatory System</strong>
                  <ul>
                    <li>Blood always flows inside vessels (arteries, veins, capillaries).</li>
                    <li>Exchange occurs via capillaries; more efficient.</li>
                  </ul>
                  <div className="patt-comparison-examples">
                    <em>Examples:</em> Annelida (Earthworm), Cephalopod Molluscs, Chordata (Vertebrates)
                  </div>
                </div>
              </div>
              {/* Large Image as requested */}
              <figure className="patt-section-image-wrapper patt-comparison-image-large">
                <img
                  src="https://res.cloudinary.com/duibfmcw1/image/upload/v1768297508/open_and_close_circulation_vxd1mk.png"
                  alt="Visual comparison of Open vs Closed systems"
                  className="patt-section-image"
                />
                <figcaption className="patt-comparison-caption">
                  Visual comparison of Open vs Closed systems
                </figcaption>
              </figure>
            </>
          ),
          // Image moved to customContent for size control
        },
        {
          heading: "Open and Closed Comparison",
          table: {
            headers: ["Blood Type Comparison", "Open Circulatory System", "Closed Circulatory System"],
            rows: [
              ["Blood flow", "Through open sinuses", "Through blood vessels"],
              ["Contact with tissues", "Direct", "Indirect (via capillaries)"],
              ["Regulation", "Less precise", "Highly regulated"],
              ["Efficiency", "Lower", "Higher"],
              ["Examples", "Arthropoda, non-cephalopod Mollusca, Hemichordata", "Annelida, cephalopod Mollusca, Chordata"]
            ]
          }
        },
        {
          heading: "Visual Comparison",
          table: {
            headers: ["Type", "Medium", "Key Feature", "System / Organ", "Phylum Examples"],
            rows: [
              ["Without blood", "Water", "Blood absent; water transports materials", "Water canal system", "Porifera"],
              ["", "", "Same cavity for digestion & transport", "Gastrovascular system", "Cnidaria, Ctenophora"],
              ["", "", "Helps in locomotion, respiration", "Water vascular system", "Echinodermata"],
              ["With blood", "Blood", "Blood is transport medium", "Circulatory system", "Higher invertebrates & vertebrates"],
            ]
          }
        },
        {
          heading: "Circulatory Pathway – Heart",
          content: [
            "All vertebrates possess a muscular, chambered heart.",
            "The number of chambers depends on the type of circulation."
          ]
        },
        {
          heading: "The heart may have:",
          isSubSubtopic: true,
          content: [
            "1 or 2 atria (auricles)",
            "1 or 2 ventricles"
          ]
        },
        {
          heading: "Single Circulation System",
          text: "In single circulation, blood passes through the heart only once during one complete cycle.",
          isSubtopic: true,
          content: [
            "The heart pumps deoxygenated blood to the gills",
            "Blood becomes oxygenated in the gills",
            "Oxygenated blood flows to body tissues",
            "Deoxygenated blood returns to heart."
          ],
          examples: ["Fishes (Pisces)"],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297517/single_circulation_system_dwydoc.png",
        },
        {
          heading: "fish heart",
          isSubtopic: true,
          content: [
            "Functionally two-chambered (one atrium + one ventricle)",
            "Also includes sinus venosus and bulbus/conus arteriosus",
            "Exception: Lungfish → three-chambered heart"
          ]
        },
        {
          heading: "Incomplete Double Circulation (3-Chambered)",
          isSubtopic: true,
          text: "In incomplete double circulation, blood passes through the heart twice, but oxygenated and deoxygenated blood mix partially.",
          content: [
            "Left atrium → oxygenated blood",
            "Right atrium → deoxygenated blood",
            "Both enter a single ventricle",
            "Mixed blood is pumped to the body"
          ],
          examples: [
            "Amphibians (Frogs),Most reptiles,Lungfishes",
            "Three-chambered heart (2 atria + 1 ventricle)",
            "Reptiles have an incomplete interventricular septum",
            "Exception: Crocodile → 4-chambered heart"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297500/incomplete_double_circulation_system_1_sh9itq.png"
        },
        {
          isSubtopic: true,
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297504/incomplete_double_circulation_system_2_z2jiti.png"
        },
        {
          heading: "Double Circulation (4-Chambered)",
          text: "In double circulation, blood passes through the heart twice, and oxygenated and deoxygenated blood never mix.",
          isSubtopic: true,
          content: [
            "Pulmonary circulation – heart → lungs → heart",
            "Systemic circulation – heart → body → heart"
          ],
          examples: [
            "Birds",
            "Mammals",
            "Crocodiles"
          ]
        },
        {
          heading: "Heart Structure",
          isSubtopic: true,
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768297492/complete_double_circulation_system_zktucz.png",
          content: [
            "Four-chambered heart",
            "Inter-auricular septum",
            "Inter-ventricular septum"
          ]
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Type of Circulation", "Heart Chambers", "Blood Mixing", "Major Groups", "Examples"],
            rows: [
              ["Single circulation", "2 (1 atrium + 1 ventricle)", "No mixing", "Pisces", "Fishes"],
              ["Incomplete double circulation", "3 (2 atria + 1 ventricle)", "Partial mixing", "Amphibia, Reptilia", "Frog, Lizard"],
              ["Double circulation", "4 (2 atria + 2 ventricles)", "No mixing", "Aves, Mammalia", "Birds, Humans"],
              ["Exception", "4 chambers", "No mixing", "Reptilia", "Crocodile"]
            ]
          }
        }
      ]
    },
    excretory: {
      title: "Excretory System",
      sections: [
        {
          heading: "Overview",
          text: "Excretion is the process by which an organism removes metabolic waste products — especially nitrogenous wastes produced by protein and nucleic acid metabolism. It also helps maintain the internal chemical balance of the body (homeostasis).",
          content: [
            "The primary nitrogenous waste products are ammonia (NH₃), urea, and uric acid. Animals are classified based on their dominant nitrogenous waste:",
            "Ammonotelic animals excrete ammonia (highly toxic, requires lots of water) — e.g. aquatic invertebrates, bony fishes.",
            "Ureotelic animals excrete urea (less toxic, needs less water) — e.g. amphibians, mammals.",
            "Uricotelic animals excrete uric acid (least toxic, conserves water) — e.g. insects, reptiles, birds.",
            "Excretory organs progressively evolved from simple diffusion → flame cells → nephridia → Malpighian tubules → kidneys."
          ]
        },
        {
          heading: "Stage 1: Excretion by Diffusion (No Excretory Organs)",
          text: "Phyla: Porifera, Cnidaria, Ctenophora, Echinodermata",
          content: [
            "These animals do not possess any excretory organs",
            "Metabolic wastes (mainly ammonia) are removed by simple diffusion.",
            "Waste diffuses out through:General body surface,Tube feet and papulae (in echinoderms)",
            "Aquatic habitat provides abundant water for dilution"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320265/Excretion_by_Diffusion_xjz0f3.png"
        },
        {
          isSubtopic: true,
          content: [
            "Mode of excretion: Diffusion",
            "Nature: Most primitive condition"
          ]
        },
        {
          heading: "Stage 2: Protonephridia (Primitive Tubular Excretory System)",
          text: "Phyla: Platyhelminthes, Some Annelids, Cephalochordata",
          content: [
            "Here, the first tubular excretory structures appear.",
            "Function: Excretion + osmoregulation",
            "Significance: First organized excretory system"
          ]
        },
        {
          heading: "Types of Protonephridia",
          isSubtopic: true,
        },
        {
          heading: "Flame cells (with cilia)",
          isSubSubtopic: true,
          content: [
            "Found in Platyhelminthes and some annelids.",
            "Cilia beat like a flame and drive waste fluid out."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320275/flame_cells_sxokcx.png"
        },
        {
          heading: "Solenocytes (with flagella)",
          isSubSubtopic: true,
          content: [
            "Found in Cephalochordata",
            "Function similar to flame cells but use flagella"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320337/solenocytes_giwwfx.png"
        },
        {
          heading: "Stage 3: Glandular Excretory Structures",
          content: [
            "Nature: Simple but specialized",
            "Intermediate evolutionary stage"
          ]
        },
        {
          heading: "Phylum: Nematoda (Aschelminthes)",
          isSubtopic: true,
          content: [
            "Excretion carried out by renette cells",
            "These are large glandular cells",
            "Also called intracellular tubes",
            "Open to the exterior through an excretory pore"
          ]
        },
        {
          heading: "Stage 4: Metanephridia (True Nephridia)",
          text: "Phyla: Annelida, Non-cephalopod Mollusca",
          content: [
            "Excretory organs are metanephridia (nephridia)",
            "Segmentally arranged tubular structures",
            "Highly efficient removal of wastes",
            "Better regulation of body fluids"
          ]
        },
        {
          heading: "Each nephridium has:",
          content: [
            "Nephrostome (funnel)",
            "Tubule",
            "Nephridiopore"
          ]
        },
        {
          heading: "Stage 5: Specialized Excretory Organs in Arthropods",
          text: "Phyla: Arthropods",
          content: [
            "Different classes show different excretory organs, indicating specialization.",
            "Adapted to terrestrial life",
            "Efficient water conservation"
          ],
          table: {
            headers: ["Group", "Excretory Organ"],
            rows: [
              ["Insects", "Malpighian tubules"],
              ["Crustaceans", "Antennary (Green) / Maxillary glands"],
              ["Arachnids", "Coxal glands"]
            ]
          },
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320308/Malpighian_tubules_sgruep.png"
        },
        {
          isSubtopic: true,
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320295/green_gland_xhgzkl.png"
        },
        {
          isSubtopic: true,
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768320258/coxwl_gland_qos8wx.png"
        },
        {
          heading: "Stage 6: Kidney – Advanced Excretory Organ",
          text: "Phyla: Cephalopod Mollusca & Vertebrata",
          content: [
            "Excretion carried out by well-developed kidneys",
            "Nephron is the structural and functional unit",
            "Kidney structure varies according to habitat"
          ]
        },
        {
          heading: "Marine fishes",
          isSubtopic: true,
          content: [
            "Aglomerular kidney",
            "Produce very little isoosmotic urine"
          ]
        },
        {
          heading: "Freshwater fishes & Amphibians",
          isSubtopic: true,
          content: [
            "No Henle’s loop",
            "Produce large amount of dilute (hypoosmotic) urine"
          ]
        },
        {
          heading: "Reptiles",
          isSubtopic: true,
          content: [
            "Reduced or absent glomeruli",
            "No Henle’s loop",
            "Produce very little hypotonic urine"
          ]
        },
        {
          heading: "Mammals",
          isSubtopic: true,
          content: [
            "Long loop of Henle",
            "Produce concentrated (hyperosmotic) urine"
          ]
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Evolutionary Stage", "Excretory Structure", "Phylum Examples"],
            rows: [
              ["Diffusion", "No organs", "Porifera, Cnidaria, Echinodermata"],
              ["Protonephridia", "Flame cells / Solenocytes", "Platyhelminthes, Cephalochordata"],
              ["Glandular", "Renette cells", "Nematoda"],
              ["Metanephridia", "Nephridia", "Annelida, Mollusca"],
              ["Tubular / Glandular", "Malpighian / Green / Coxal glands", "Arthropods"],
              ["Renal", "Kidney (Nephron)", "Vertebrates, Cephalopods"]
            ]
          }
        },
        {
          heading: "Types of Excretion (Nitrogenous Waste)",
          content: [
            <p>Living organisms eliminate nitrogenous wastes formed during protein and nucleic acid metabolism. The major nitrogenous waste products are:
              <ul>
                <li>Ammonia</li>
                <li>Urea</li>
                <li>Urics Acid</li>
              </ul>
            </p>,
            "Other nitrogenous wastes include: Trimethylamine oxide (TMO), guanine, hippuric acid, creatinine, creatine, purines, pyrimidines, and pteridines."
          ]
        },
        {
          heading: "Modes of Excretion",
          isSubtopic: true
        },
        {
          heading: "1.Ammonotelism",
          isSubtopic: true,
          content: [
            "Animals that excrete ammonia are called ammonotelic.",
            <p>Nitrogenous waste: Ammonia
              <ul>
                <li>Ammonia is the most toxic nitrogenous waste.</li>
                <li>It requires a large amount of water for elimination.</li>
                <li>Ammonia is highly water-soluble.</li>
                <li>It is generally excreted by diffusion across the body surface or through gill surfaces, mainly as ammonium ions.</li>
              </ul>
            </p>
          ],
          examples: [
            "Aquatic invertebrates",
            "Freshwater bony fishes",
            "Larval amphibians",
            "Crustaceans"
          ]
        },
        {
          heading: "Terrestrial Adaptation",
          isSubSubtopic: true,
          text: "With the transition to land, animals evolved less toxic nitrogenous wastes (urea and uric acid) to conserve water."
        },
        {
          heading: "2. Ureotelism",
          isSubtopic: true,
          content: [
            "Animals that excrete urea are called ureotelic.",
            <p>Nitrogenous waste: Urea
              <ul>
                <li>Urea is much less toxic than ammonia.</li>
                <li>It is highly soluble in water and can be excreted in a concentrated form.</li>
                <li>Urea is about 100,000 times less toxic than ammonia.</li>
                <li>It is synthesized in the liver through the ornithine cycle (urea cycle).</li>
              </ul>
            </p>
          ],
          examples: [
            "Cartilaginous fishes",
            "Adult amphibians",
            "Mammals"
          ]
        },
        {
          heading: "3.Uricotelism",
          isSubtopic: true,
          content: [
            "Animals that excrete uric acid are called uricotelic",
            <p>Nitrogenous waste: Uric Acid
              <ul>
                <li>Uric acid is the least toxic nitrogenous waste.</li>
                <li>It is almost insoluble in water.</li>
                <li>It is excreted in the form of pellets or semi-solid paste, resulting in minimal water loss.</li>
              </ul>
            </p>
          ],
          examples: [
            "Reptiles",
            "Birds",
            "Insects",
            "Gastropoda"
          ]
        },
        {
          heading: "Significance in Shelled Eggs",
          isSubSubtopic: true,
          content: [
            "If embryos inside shelled eggs produced ammonia or urea, these wastes would accumulate to toxic levels.",
            <p>This problem is solved because such animals are uricotelic—uric acid precipitates due to its insolubility and remains harmlessly within the egg shell.
              <ul>
                <li>Fishes and amphibians have shell-less eggs, allowing ammonia or urea to diffuse out.</li>
                <li>Mammals do not face this problem because urea is transported to the mother via the placenta.</li>
              </ul>
            </p>
          ]
        },
        {
          heading: "4. Guanotelism",
          isSubtopic: true,
          content: [
            "Animals that excrete guanine are called guanotelic.",
            <p>Nitrogenous waste: Guanine
              <ul>
                <li>Guanine is structurally similar to uric acid.</li>
                <li>It is relatively non-toxic.</li>
                <li>Requires very little water for excretion.</li>
              </ul>
            </p>
          ],
          examples: [
            "Arachnids"
          ]
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Mode of Excretion", "Nitrogenous Waste", "Toxicity", "Water Requirement", "Solubility", "Typical Habitat", "Examples"],
            rows: [
              ["Ammonotelism", "Ammonia", "Most toxic", "Very high", "Highly soluble", "Aquatic", "Aquatic invertebrates, freshwater bony fishes, larval amphibians, crustaceans"],
              ["Ureotelism", "Urea", "Less toxic", "Moderate", "Highly soluble", "Semi-aquatic / Terrestrial", "Cartilaginous fishes, adult amphibians, mammals"],
              ["Uricotelism", "Uric acid", "Least toxic", "Very low", "Almost insoluble", "Dry terrestrial", "Reptiles, birds, insects, gastropods"],
              ["Guanotelism", "Guanine", "Low toxicity", "Very low", "Poorly soluble", "Terrestrial", "Arachnids"]
            ]
          }
        },
        {
          heading: "One-line Memory Summary",
          content: [
            "Ammonia → very toxic → lots of water → aquatic",
            "Urea → moderately toxic → some water saving → land & semi-aquatic",
            "Uric acid / Guanine → least toxic → maximum water saving → dry land"
          ]
        }
      ]
    },
    skeletal: {
      title: "Skeletal System",
      sections: [
        {
          heading: "Overview",
          text: "The skeleton is the rigid or semi-rigid framework that gives the body shape, support, and protection. It also plays a crucial role in locomotion by providing surfaces for muscle attachment.",
          content: [
            "Skeletons are broadly classified into two types: exoskeleton (outside the body) and endoskeleton (inside the body).",
            "Simpler animals (Porifera, Cnidaria) have spicules or a hydrostatic skeleton (fluid-filled cavity providing support).",
            "Higher invertebrates like arthropods developed a chitinous exoskeleton, while vertebrates possess a bony or cartilaginous endoskeleton.",
            "A key evolutionary trend is the shift from external to internal skeletons — this allows greater body size, more efficient movement, and continuous growth."
          ]
        },
        {
          heading: "Types of Skeleton"
        },
        {
          heading: "Exoskeleton",
          isSubtopic: true,
          text: "An exoskeleton is a skeleton that is present outside the body. It is usually formed of dead, non-living structures secreted by the epidermis.",
          content: [
            <p>Functions
              <ul>
                <li>Protects the body from injury</li>
                <li>Prevents loss of water</li>
                <li>Provides support and rigidity</li>
              </ul>
            </p>,
            "Note: In mammals, these structures are epidermal derivatives, not true bones."
          ],
          examples: [
            "Calcareous shell in Mollusca (snail, oyster)",
            "Chitinous sclerites in Arthropoda (insects, crabs)",
            "Epidermal scales in reptiles",
            "Feathers in birds",
            "Hair, nails, claws, horns, and hooves in mammals"
          ]
        },
        {
          heading: "Endoskeleton",
          isSubtopic: true,
          text: "An endoskeleton is a skeleton that is present inside the body. It is made of living tissues, mainly cartilage and bone.",
          content: [
            <p>Functions
              <ul>
                <li>Provides internal support</li>
                <li>Protects vital organs</li>
                <li>Allows efficient movement</li>
                <li>Grows along with the body</li>
              </ul>
            </p>
          ],
          examples: [
            "Cartilaginous and bony skeleton of vertebrates (fish, frog, humans)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768412652/exo_and_endo_skeleton_cfmuvg.png"
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Feature", "Exoskeleton", "Endoskeleton"],
            rows: [
              ["Position", "Outside body", "Inside body"],
              ["Nature", "Non-living (secreted by epidermis)", "Living tissue (cartilage / bone)"],
              ["Composition", "Chitin, calcium carbonate, keratin", "Calcium phosphate, collagen"],
              ["Growth", "Does not grow — must be shed (moulting)", "Grows continuously with the body"],
              ["Moulting", "Required (ecdysis in arthropods)", "Not required"],
              ["Body size limit", "Limits body size (weight constraint)", "Allows larger body size"],
              ["Examples", "Shells, scales, feathers, chitin", "Bones, cartilage, vertebral column"]
            ]
          }
        },
        {
          heading: "Axial Supporting Structures"
        },
        {
          heading: "Stomochord",
          isSubtopic: true,
          text: "The stomochord is a hollow, flexible tube found only in hemichordates. It lies in the anterior region of the body and provides support to the proboscis.",
          content: [
            <p>Important clarification:
              <ul>
                <li>Stomochord is not a true notochord</li>
                <li>It is not mesodermal in origin</li>
                <li>Hence, hemichordates are not true chordates</li>
              </ul>
            </p>
          ]
        },
        {
          heading: "Notochord",
          isSubtopic: true,
          text: "The notochord is a rod-like, flexible structure derived from the mesoderm. It forms during embryonic development and lies on the dorsal side of the body.",
          content: [
            <p>Functions
              <ul>
                <li>Acts as a primary internal skeleton</li>
                <li>Provides support and defines the body axis</li>
                <li>Helps in the development of the vertebral column</li>
              </ul>
            </p>,
            "Animals that possess a notochord at any stage of life are called chordates.",
            "Animals that never form a notochord are called non-chordates."
          ],
        },
        {
          heading: "Vertebrates",
          text: "In many chordates, the notochord is present only during embryonic stages. Later, it is replaced by a vertebral column (backbone) made of bone or cartilage.",
          content: [
            "These animals are called vertebrates.",
          ],
          examples: [
            "Fishes",
            "Amphibians",
            "Reptiles",
            "Birds",
            "Mammals"
          ]
        },
        {
          heading: "Key Concept: Skeleton Evolution",
          text: "The skeleton evolved from simple spicules and hydrostatic support in invertebrates to an internal bony framework in vertebrates. The notochord — the first true axial skeleton — was a breakthrough that enabled the radiation of chordates.",
          customContent: (
            <div className="patt-did-you-know">
              <div className="patt-did-you-know-title">Did You Know?</div>
              <div className="patt-did-you-know-content">
                The human skeleton contains 206 bones, but babies are born with approximately 270! Many of these fuse together during growth — for example, the skull has several fontanelles (soft spots) at birth that gradually ossify.
              </div>
            </div>
          )
        }
      ]
    },
    metamerism: {
      title: "Metamerism (Segmentation)",
      sections: [
        {
          heading: "Overview",
          text: "Metamerism (segmentation) is the division of the animal body into a series of similar, repeating units along the head-to-tail axis. Each unit is called a metamere or somite.",
          content: [
            "Segmentation is one of the most important body plans in animal evolution — it allows greater flexibility, efficient locomotion, and regional specialisation.",
            "Each metamere can contain its own set of muscles, nerves, blood vessels, and excretory organs — this repetition is called serial homology.",
            <p>Metamerism is found in three highly organized phyla:
              <ul>
                <li>Annelida</li>
                <li>Arthropoda</li>
                <li>Chordata</li>
              </ul>
            </p>,
            "In these animals, segmentation may be present externally, internally, or both.",
            "When segmentation is present both externally and internally, it is called true (metameric) segmentation."
          ]
        },
        {
          heading: "Types of Metamerism",
          text: "Metamerism is classified into two main types based on how similar the segments are:",
        },
        {
          heading: "Homonomous Metamerism",
          isSubtopic: true,
          text: "All segments are essentially identical in structure and function — like a chain of identical links.",
          content: [
            "Each metamere contains the same set of organs (nephridia, ganglia, setae).",
            "Simple and repetitive — damage to one segment doesn't critically affect the whole animal."
          ],
          examples: [
            "Annelida — Earthworm (each segment has nephridia, setae, ganglia)"
          ]
        },
        {
          heading: "Heteronomous Metamerism",
          isSubtopic: true,
          text: "Segments are dissimilar and have become specialised for different functions — this is called tagmosis (fusion and specialisation of segments into body regions).",
          content: [
            "Body segments are grouped into distinct functional regions (tagmata) — e.g. head, thorax, abdomen.",
            "Different tagmata perform different roles: the head for sensing, the thorax for locomotion, and the abdomen for reproduction.",
            "This is considered more advanced than homonomous metamerism."
          ],
          examples: [
            "Arthropoda — Insects (head + thorax + abdomen), Crabs (cephalothorax + abdomen)",
            "Chordata — Vertebrates (internal segmentation: vertebrae, spinal nerves, myotomes)"
          ]
        },
        {
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768415124/homo_and_hetro_pd0unc.png"
        }
      ]
    },
    nervous: {
      title: "Nervous System",
      sections: [
        {
          heading: "Overview",
          text: "The nervous system controls and coordinates all body activities through electrical impulses and chemical signals. It evolved from simple cellular coordination in sponges to a highly centralised brain-and-spinal-cord system in vertebrates.",
          content: [
            "The nervous system is ectodermal in origin and is composed of specialised cells called neurons, which detect, receive, and transmit stimuli.",
            "Neurons communicate at junctions called synapses using chemical messengers called neurotransmitters (e.g. acetylcholine, dopamine).",
            "A key evolutionary trend is cephalization — the concentration of nervous tissue at the anterior (head) end, forming a brain.",
            "Complexity increases: no nervous system (Porifera) → diffuse nerve net (Cnidaria) → ventral nerve cord with ganglia (Annelida, Arthropoda) → dorsal hollow nerve cord with brain (Chordata)."
          ]
        },
        {
          heading: "Absence of Nervous System (Cellular Coordination)"
        },
        {
          heading: "Porifera (Sponges)",
          isSubtopic: true,
          content: [
            "Nervous system: Absent",
            "No neurons or nerve tissues are present.",
            "Body activities are controlled by simple cell-to-cell coordination."
          ],
          text: "This represents the most primitive condition."
        },
        {
          heading: "Diffuse Nervous System (Nerve Net)",
        },
        {
          heading: "Cnidaria (Coelenterata) & Ctenophora",
          isSubtopic: true,
          content: [
            "Nervous system consists of a loose network of nerve fibers, called a nerve net.",
            "Nerve cells are present on both sides of the mesoglea.",
            "No brain or ganglia.",
            "Impulses can travel in all directions."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806540/Diffuse_Nervous_System_ya6k5s.png"
        },
        {
          heading: "Beginning of Centralization (Nerve Ring + Nerve Cords)"
        },
        {
          heading: "Platyhelminthes & Aschelminthes",
          isSubtopic: true,
          content: [
            "Nervous system shows early centralization.",
            "A nerve ring is present around the anterior part of the gut.",
            "From the nerve ring, many longitudinal nerve cords extend backward.",
            "Often described as a ladder-like nervous system."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806530/Beginning_of_Centralization_s2cmzl.png",
          text: "This allows directional movement and better coordination."
        },
        {
          heading: "Further Centralization and Segmentation"
        },
        {
          heading: "Annelida & Arthropoda",
          isSubtopic: true,
          content: [
            "Nervous system is well developed and centralized.",
            "A nerve ring surrounds the anterior part of the gut.",
            "A double, solid, mid-ventral nerve cord is present.",
            "The nerve cord has segmentally arranged ganglia."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806805/Further_Centralization_and_Segmentation_gqin79.png",
          text: "This arrangement provides precise control of segmented body movements."
        },
        {
          heading: "Ganglionic Nervous System with Commissures"
        },
        {
          heading: "Mollusca",
          isSubtopic: [
            "Nervous system consists of paired ganglia.",
            <p>Ganglia are interconnected by:
              <ul>
                <li>Commissures (between similar ganglia)</li>
                <li>Connectives (between different ganglia)</li>
              </ul>
            </p>,
            <p>Complexity varies:
              <ul>
                <li>Simple in gastropods</li>
                <li>Highly developed in cephalopods</li>
              </ul>
            </p>
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806812/Ganglionic_Nervous_System_with_Commissures_uwddmx.png",
          text: "This allows higher coordination and learning ability."
        },
        {
          heading: "Radial Nervous System"
        },
        {
          heading: "Echinodermata",
          isSubtopic: true,
          content: [
            "Nervous system shows radial symmetry.",
            <p>Consists of:
              <ul>
                <li>Oral nerve ring</li>
                <li>Aboral nerve ring</li>
                <li>Radial nerves extending into arms</li>
              </ul>
            </p>,
            "No true brain."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806822/Radial_Nervous_System_hcn78a.png",
          text: "Suitable for radially symmetrical body plan."
        },
        {
          heading: "Diffuse with Nerve Cords (Primitive Chordate Condition)"
        },
        {
          heading: "Hemichordata",
          isSubtopic: true,
          content: [
            "Still lacks true chordate organization.",
            <p>Nervous system includes:
              <ul>
                <li>Basiepidermal nerve net</li>
                <li>Intraepidermal nerve net</li>
                <li>Dorsal and ventral nerve cords</li>
              </ul>
            </p>
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806802/Diffuse_with_Nerve_Cords_dfnsko.png",
          text: "Represents a transitional condition."
        },
        {
          heading: "Highly Centralized Nervous System"
        },
        {
          heading: "Vertebrates (Chordata)",
          isSubtopic: true,
          content: [
            "Nervous system is most complex and centralized.",
            <p>Composed of:
              <ul>
                <li>Brain</li>
                <li>Single dorsal, hollow, non-ganglionated nerve cord (spinal cord)</li>
                <li>Cranial nerves</li>
                <li>Spinal nerves</li>
                <li>Autonomic (sympathetic) nervous system</li>
              </ul>
            </p>,
            "Brain is enclosed in the cranium.",
            "Spinal cord is protected by the vertebral column."
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768806818/Highly_Centralized_Nervous_System_dvylee.png",
          text: "This allows advanced behavior, learning, and rapid responses."
        },
        {
          heading: "Comparison Table",
          table: {
            headers: ["Level of Complexity", "Nervous System Type", "Phylum Examples"],
            rows: [
              ["Absent", "No neurons", "Porifera"],
              ["Diffuse", "Nerve net", "Cnidaria, Ctenophora"],
              ["Slightly centralized", "Nerve ring + cords", "Platyhelminthes, Aschelminthes"],
              ["Centralized & segmented", "Ventral nerve cord with ganglia", "Annelida, Arthropoda"],
              ["Ganglionic", "Interconnected ganglia", "Mollusca"],
              ["Radial", "Nerve rings + radial nerves", "Echinodermata"],
              ["Transitional", "Nerve nets + cords", "Hemichordata"],
              ["Highly centralized", "Brain + spinal cord", "Vertebrates"]
            ]
          }
        }
      ]
    },
    reproductive: {
      title: "Reproductive System",
      sections: [
        {
          heading: "Reproductive System in Animals",
          text: "Reproduction is the most fundamental biological drive — it ensures the continuation of species and maintains population size across generations. Animals reproduce through two main strategies: asexual and sexual reproduction.",
          content: [
            "Asexual reproduction produces genetically identical offspring (clones) from a single parent — fast but no genetic variation.",
            "Sexual reproduction involves fusion of gametes from two parents — slower but generates genetic diversity, which is essential for evolution and adaptation.",
            "Most higher animals reproduce exclusively by sexual reproduction, while many lower animals can use both modes."
          ]
        },
        {
          heading: "Asexual Reproduction",
          text: "In asexual reproduction, a single parent produces new individuals without gamete formation or fusion. The offspring are genetically identical to the parent (clones). This type is common in simpler animals and is favoured in stable environments.",
          content: [
            "No meiosis or fertilisation is involved — reproduction occurs by mitosis.",
            "Advantages: rapid multiplication, requires only one parent, guaranteed reproduction.",
            "Disadvantages: no genetic variation — entire population is vulnerable to the same disease or environmental change."
          ]
        },
        {
          heading: "Common Methods of Asexual Reproduction",
          isSubtopic: true
        },
        {
          heading: "Binary Fission",
          isSubSubtopic: true,
          text: "One organism divides into two equal individuals.",
          examples: [
            "Protozoans (Amoeba, Paramecium)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768827203/Screenshot_2026-01-19_182113_w2h4tq.png"
        },
        {
          heading: "Multiple Fission",
          isSubSubtopic: true,
          text: "One parent produces many offspring at once.",
          examples: [
            "Protozoans (Plasmodium)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768827203/Screenshot_2026-01-19_182201_qslxlh.png"
        },
        {
          heading: "Budding",
          isSubSubtopic: true,
          text: "A small outgrowth (bud) forms on the parent and later separates.",
          examples: ["Cnidaria (Hydra)"],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768827203/Screenshot_2026-01-19_182224_sauk4z.png"
        },
        {
          heading: "Fragmentation",
          isSubSubtopic: true,
          text: "The body breaks into pieces, and each piece develops into a new individual.",
          examples: ["Porifera (Sponges), some Annelids"],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768827203/Screenshot_2026-01-19_182244_pq8n1a.png"
        },
        {
          heading: "Sexual Reproduction",
          content: [
            "In sexual reproduction, two parents are usually involved.",
            <p>It includes:
              <ul>
                <li>Formation of gametes</li>
                <li>Fusion of male and female gametes (fertilization)</li>
              </ul>
            </p>,
            "This type of reproduction is common in higher animals and leads to genetic variation."
          ]
        },
        {
          heading: "Gametes and Gonads",
          isSubtopic: true,
          content: [
            "Gametes are sex cells.",
            "Male gamete: Sperm",
            "Female gamete: Ovum (egg)"
          ]
        },
        {
          heading: "Gametes are produced in special organs called gonads:",
          isSubtopic: true,
          content: [
            "Testes → produce sperms",
            "Ovaries → produce ova"
          ]
        },
        {
          heading: "Based on Distribution of Sexes"
        },
        {
          heading: "Unisexual (Dioecious) Animals",
          isSubtopic: true,
          content: [
            "Male and female gonads are present in different individuals.",
            "Each organism is either male or female."
          ],
          example: [
            "Nematoda (Ascaris)",
            "Arthropoda",
            "Most vertebrates (fishes, birds, mammals)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768828698/Screenshot_2026-01-19_184735_q1ybcj.png"
        },
        {
          heading: "Bisexual (Monoecious / Hermaphrodite) Animals",
          isSubtopic: true,
          content: [
            "Both testes and ovaries are present in the same individual.",
            "Self-fertilization or cross-fertilization may occur."
          ],
          examples: [
            "Platyhelminthes (Taenia)",
            "Annelida (Earthworm)",
            "Some Molluscs"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768828697/Screenshot_2026-01-19_184755_b7wunj.png"
        },
        {
          heading: "Evolutionary Trend in Reproduction",
          content: [
            "Lower animals → mainly asexual reproduction",
            "Higher animals → sexual reproduction",
            "Sexual reproduction increases variation, adaptability, and survival"
          ]
        },
        {
          heading: "comparison table",
          table: {
            headers: ["Phylum / Group", "Type of Reproduction", "Sexual Condition", "Special Features / Examples"],
            rows: [
              ["Porifera", "Asexual & Sexual", "Mostly bisexual (hermaphrodite)", "Asexual by budding, fragmentation; sexual by gametes"],
              ["Cnidaria (Coelenterata)", "Asexual & Sexual", "Mostly bisexual", "Budding common (Hydra); alternation of generations in some"],
              ["Ctenophora", "Sexual", "Bisexual", "Self-fertilization rare; marine forms"],
              ["Platyhelminthes", "Sexual (some asexual)", "Bisexual", "Complex reproductive organs (e.g., Taenia)"],
              ["Nematoda (Aschelminthes)", "Sexual", "Unisexual (dioecious)", "Sexual dimorphism common (Ascaris)"],
              ["Annelida", "Sexual (some asexual)", "Mostly bisexual", "Earthworm is hermaphrodite; clitellum present"],
              ["Mollusca", "Sexual", "Mostly unisexual (some bisexual)", "Cephalopods show advanced reproduction"],
              ["Arthropoda", "Sexual", "Unisexual", "Metamorphosis common; insects show high specialization"],
              ["Echinodermata", "Sexual (some asexual)", "Unisexual", "High regeneration capacity"],
              ["Hemichordata", "Sexual", "Unisexual", "Simple gonads"],
              ["Chordata (Vertebrates)", "Sexual", "Mostly unisexual", "Advanced organs; placenta in mammals"]
            ]
          }
        }
      ]
    },
    fertilization: {
      title: "Fertilization",
      sections: [
        {
          heading: "Overview",
          text: "Fertilization (syngamy) is the fusion of a male gamete (sperm) with a female gamete (ovum) to form a diploid zygote — the first cell of a new individual. It restores the diploid chromosome number.",
          content: [
            "Fertilization involves two key events: activation of the egg (triggering development) and combination of paternal and maternal genetic material.",
            "Based on where fertilization occurs, it is classified as external (outside the body, in water) or internal (inside the female reproductive tract).",
            "The evolutionary trend is from external → internal fertilization, reflecting increasing protection of gametes and developing embryos."
          ]
        },
        {
          heading: "Types of Fertilization (Based on Place)"
        },
        {
          heading: "1. External Fertilization",
          isSubtopic: true,
          text: "Sperms and eggs are released into the external environment (usually water), and fertilization happens outside the body. This is called spawning.",
          content: [
            "Common in aquatic animals where water acts as a medium for gamete transport.",
            "A very large number of gametes must be produced because many are lost to predation, currents, and dilution.",
            "There is no parental protection of eggs or embryos in most cases.",
            "Advantage: requires no physical contact between mates."
          ],
          examples: [
            "Many aquatic invertebrates (starfish, sea urchins)",
            "Bony fishes (Rohu, Catla)",
            "Amphibians (frogs — eggs laid in water)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768831239/Screenshot_2026-01-19_193008_afkwql.png"
        },
        {
          heading: "2.Internal Fertilization",
          isSubtopic: true,
          text: "Internal fertilization occurs when the fusion of sperm and egg takes place inside the female reproductive tract.",
          content: [
            "Common in terrestrial animals",
            "Also seen in some aquatic vertebrates",
            "Produces fewer gametes but has a higher success rate",
            "Fertilization occurs inside the body."
          ],
          examples: [
            "Reptiles",
            "Birds",
            "Mammals",
            "Some fishes (e.g., sharks)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768831239/Screenshot_2026-01-19_193021_l2gqtj.png"
        },
        {
          heading: "Types of Fertilization (Based on Parents)"
        },
        {
          heading: "3.Self-Fertilization",
          isSubtopic: true,
          text: "Self-fertilization occurs when the sperm and egg produced by the same individual fuse together.",
          content: [
            "Seen in bisexual (hermaphrodite) animals",
            "Ensures reproduction even when mates are unavailable"
          ],
          examples: [
            "Taenia",
            "Earthworm (rare, usually cross-fertilization preferred)"
          ]
        },
        {
          heading: "4.Cross-Fertilization",
          isSubtopic: true,
          text: "Cross-fertilization occurs when the gametes from two different individuals fuse.",
          content: [
            "Most common type in animals",
            "Leads to genetic variation",
            "Fertilization evolved from external (aquatic) → internal (terrestrial) with increasing protection of gametes and embryos"
          ],
          examples: [
            "Most animals, including humans"
          ]
        },
        {
          heading: "comparison-table",
          table: {
            headers: ["Phylum", "Type of Fertilization", "Nature (Self / Cross)", "Examples"],
            rows: [
              ["Porifera", "Internal fertilization", "Mostly self (bisexual)", "Sponges"],
              ["Cnidaria (Coelenterata)", "External (mostly)", "Cross-fertilization", "Hydra, Jellyfish"],
              ["Ctenophora", "External", "Self or cross", "Comb jellies"],
              ["Platyhelminthes", "Internal", "Mostly self (bisexual)", "Taenia, Planaria"],
              ["Nematoda (Aschelminthes)", "Internal", "Cross-fertilization", "Ascaris"],
              ["Annelida", "External or internal", "Mostly cross", "Earthworm"],
              ["Mollusca", "External or internal", "Mostly cross", "Pila, Octopus"],
              ["Arthropoda", "Internal", "Cross-fertilization", "Insects, Crabs"],
              ["Echinodermata", "External", "Cross-fertilization", "Starfish"],
              ["Hemichordata", "External", "Cross-fertilization", "Balanoglossus"],
              ["Chordata - Pisces", "External (mostly)", "Cross-fertilization", "Rohu, Shark"],
              ["Chordata - Amphibia", "External (mostly)", "Cross-fertilization", "Frog"],
              ["Chordata - Reptilia", "Internal", "Cross-fertilization", "Lizard, Snake"],
              ["Chordata - Aves", "Internal", "Cross-fertilization", "Birds"],
              ["Chordata - Mammalia", "Internal (placental)", "Cross-fertilization", "Humans"]
            ]
          }
        }
      ]
    },
    development: {
      title: "Development in Animals",
      sections: [
        {
          heading: "Overview",
          text: "Development refers to the series of changes by which a zygote grows and differentiates into an adult animal. The process involves cell division (cleavage), cell differentiation, morphogenesis (formation of body shape), and growth.",
          content: [
            "The type of development depends on the amount and distribution of yolk in the egg, the habitat, and evolutionary history.",
            "Based on modes of birth, animals are classified as oviparous (egg-laying), viviparous (live birth), or ovoviviparous (eggs retained inside the body).",
            "Based on life cycle, development can be direct (young resemble adults) or indirect (involving a larval stage and metamorphosis)."
          ]
        },
        {
          heading: "1.Oviparous Animals",
          text: "Oviparous animals lay eggs, and development of the embryo takes place outside the body of the mother.",
          content: [
            "Eggs may be laid after external or internal fertilization",
            "Embryo is nourished by yolk"
          ],
          examples: [
            "Fishes",
            "Amphibians",
            "Reptiles",
            "Birds",
            "Many invertebrates"
          ]
        },
        {
          heading: "2.Viviparous Animals",
          text: "Viviparous animals give birth to young ones.",
          contents: [
            "Fertilization is always internal",
            "The embryo develops inside the mother",
            "Nourishment is obtained directly from the mother (placenta in mammals)"
          ],
          examples: [
            "Most mammals (human, dog, cow)"
          ]
        },
        {
          heading: "3.Ovoviviparous Animals",
          text: "In ovoviviparous animals:",
          content: [
            "Eggs are retained inside the mother’s body",
            "Embryo develops inside the egg",
            "There is no direct nourishment from the mother",
            "Young ones hatch inside the mother and are then released"
          ],
          examples: [
            "Sharks",
            "Some reptiles (snakes, lizards)"
          ]
        },
        {
          heading: "Types of Development (Based on Life Cycle)",
          text: "Development is further classified into two types based on whether a larval stage is present."
        },
        {
          heading: "4.Direct Development",
          text: "In direct development:",
          content: [
            "There is no larval stage",
            "The young one resembles the adult",
            "Only growth and maturation occur"
          ],
          examples: [
            "Reptiles",
            "Birds",
            "Mammals"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768837329/Screenshot_2026-01-19_211018_qkxizo.png"
        },
        {
          heading: "5.Indirect Development",
          text: "In indirect development:",
          content: [
            "Development includes one or more larval stages",
            "Larva differs greatly from adult",
            "Larva undergoes metamorphosis to become adult"
          ],
          examples: [
            "Frog (tadpole → frog)",
            "Insects (butterfly, mosquito)"
          ],
          image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1768837329/Screenshot_2026-01-19_211035_pzvkco.png"
        }
      ]
    },
    temperature: {
      title: "Body Temperature Regulation",
      sections: [
        {
          heading: "Overview",
          text: "Animals differ fundamentally in their ability to regulate body temperature. This ability determines their activity levels, habitat range, and survival strategies. Based on thermoregulation, animals are classified into two broad groups.",
          content: [
            "Poikilothermic (ectothermic) — body temperature varies with the environment ('cold-blooded').",
            "Homeothermic (endothermic) — body temperature is maintained constant by internal metabolic heat ('warm-blooded').",
            "Thermoregulation is closely linked to metabolic rate — endotherms have a much higher basal metabolic rate than ectotherms.",
            "Some animals exhibit behavioural adaptations to cope with temperature extremes — hibernation (winter dormancy) and aestivation (summer dormancy)."
          ]
        },
        {
          heading: "Poikilothermic (Ectothermic) Animals",
          text: "Poikilothermic animals cannot generate enough metabolic heat to maintain a constant body temperature. Their body temperature fluctuates with the surrounding environment.",
          content: [
            "Also called ectothermic or 'cold-blooded' animals.",
            "Body temperature depends on external heat sources",
            "Mostly found in aquatic or warm environments"
          ],
          examples: [
            "Fishes",
            "Amphibians",
            "Reptiles",
            "Most invertebrates",
            "A lizard becomes active in sunlight and sluggish in cold."
          ]
        },
        {
          heading: "Homeothermic (Endothermic) Animals",
          text: "Homeothermic animals maintain a constant body temperature, regardless of changes in environmental temperature.",
          content: [
            "Also called endothermic animals",
            "Body heat is produced internally by metabolism",
            "Requires more energy"
          ],
          examples: [
            "Birds",
            "Mammals",
            "Humans maintain ~37 °C body temperature in all seasons"
          ]
        },
        {
          heading: "Salinity Tolerance in Animals",
          text: "Animals also differ in their ability to tolerate changes in salt concentration of the environment."
        },
        {
          heading: "Stenohaline Animals",
          text: "Stenohaline animals can tolerate only a narrow range of salinity.",
          content: [
            "Mostly marine or freshwater animals",
            "Cannot survive drastic salinity changes"
          ],
          examples: [
            "Starfish",
            "Coral fishes"
          ]
        },
        {
          heading: "Euryhaline Animals",
          text: "Euryhaline animals can tolerate a wide range of salinity changes.",
          content: [
            "Can live in both freshwater and seawater",
            "Common in estuaries"
          ],
          examples: [
            "Salmon",
            "Eels"
          ]
        }
      ]
    }
  };

  const tabKeys = Object.keys(contentData);
  const currentIndex = tabKeys.indexOf(activeTab);
  const prevTabKey = currentIndex > 0 ? tabKeys[currentIndex - 1] : null;
  const nextTabKey = currentIndex < tabKeys.length - 1 ? tabKeys[currentIndex + 1] : null;

  // Theme mapping - Mild variations
  const themeMap = {
    digestive: 'theme-digestive',
    respiratory: 'theme-respiratory',
    circulatory: 'theme-circulatory',
    excretory: 'theme-excretory',
    nervous: 'theme-nervous',
    reproductive: 'theme-reproductive',
    fertilization: 'theme-fertilization',
    development: 'theme-development',
    temperature: 'theme-temperature',
    metamerism: 'theme-metamerism'
  };

  const currentThemeClass = themeMap[activeTab] || '';

  return (
    <div className={`patt-zoo-page ${currentThemeClass}`} id="patt-patterns">

      {/* FULL PAGE HERO BANNER */}
      <section className="patt-hero-banner">
        {/* Decorative background orbs */}
        <div className="patt-hero-orb patt-hero-orb-1"></div>
        <div className="patt-hero-orb patt-hero-orb-2"></div>
        <div className="patt-hero-orb patt-hero-orb-3"></div>
        <div className="patt-hero-noise"></div>

        <div className="patt-hero-container">
          {/* LEFT CONTENT */}
          <div className="patt-hero-content">
            <div className="patt-hero-tag">📚 Comparative Zoology</div>

            <h1 className="patt-hero-title">
              Patterns of Complexity in Animal Organ Systems
            </h1>

            <p className="patt-hero-description">
              Explore how organ systems evolved from <strong>simple diffusion</strong> in sponges to
              <strong> highly centralised networks</strong> in mammals. Trace the journey across
              <strong> 11 major organ systems</strong> — digestive, respiratory, circulatory, excretory,
              skeletal, nervous, reproductive, and more — comparing every phylum from Porifera to Chordata.
            </p>

            {/* Quick Stats */}
            <div className="patt-hero-stats">
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">11</span>
                <span className="patt-hero-stat-label">Topics</span>
              </div>
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">60+</span>
                <span className="patt-hero-stat-label">Diagrams</span>
              </div>
              <div className="patt-hero-stat">
                <span className="patt-hero-stat-num">All</span>
                <span className="patt-hero-stat-label">Phyla Covered</span>
              </div>
            </div>

            <div className="patt-hero-actions">
              <button
                className="patt-hero-btn patt-hero-btn-primary"
                onClick={() => setActiveTab('digestive')}
              >
                Start Learning
              </button>
              <button
                className="patt-hero-btn"
                onClick={() => setActiveTab('circulatory')}
              >
                Circulatory
              </button>
              <button
                className="patt-hero-btn"
                onClick={() => setActiveTab('nervous')}
              >
                Nervous
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="patt-hero-visual">
            <div className="patt-hero-glow-ring"></div>
            <img
              src="https://res.cloudinary.com/duibfmcw1/image/upload/v1770023197/b9631c1c-505d-4c10-b692-551a10c83014_woswgt.png"
              alt="Organ system complexity"
              className="patt-hero-image"
              loading="eager"
            />
            <div className="patt-hero-image-decoration"></div>
          </div>
        </div>


        {/* 🖱️ SCROLL INDICATOR */}
        <div className="patt-scroll-indicator" onClick={() => {
          const content = document.querySelector('.patt-zoo-main-content');
          if (content) {
            const headerHeight = 80;
            const elementPosition = content.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }}>
          <div className="patt-mouse">
            <div className="patt-wheel"></div>
          </div>
          <div className="patt-arrow-down"></div>
        </div>
      </section>

      {/* SIDEBAR + CONTENT LAYOUT */}
      <div className="patt-zoo-app-container">

        <div
          className={`patt-sidebar-overlay ${isMobileOpen ? 'patt-open' : ''}`}
          onClick={() => setIsMobileOpen(false)}
        ></div>

        <div
          ref={sidebarRef}
          className={`patt-zoo-sidebar ${isMobileOpen ? 'patt-open' : ''} ${!showSidebar ? 'patt-sidebar-hidden' : ''}`}
          style={{ height: sidebarHeight }}
        >
          <div className="patt-sidebar-header">
            <button
              className="patt-mobile-close-btn"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Indicator - EdTech Feature */}
          <div className="patt-progress-bar">
            <div className="patt-progress-label">Learning Progress</div>
            <div className="patt-progress-track">
              <div
                className="patt-progress-fill"
                style={{ width: `${((currentIndex + 1) / tabKeys.length) * 100}%` }}
              />
            </div>
            <div className="patt-progress-text">
              Topic {currentIndex + 1} of {tabKeys.length}
            </div>
          </div>

          <nav className="patt-sidebar-nav" aria-label="Topic navigation">
            {Object.keys(contentData).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setIsMobileOpen(false);
                }}
                className={`patt-nav-btn ${activeTab === key ? 'patt-active' : ''}`}
                aria-label={`Navigate to ${contentData[key].title}`}
                aria-current={activeTab === key ? 'page' : undefined}
              >
                <span>{contentData[key].title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="patt-zoo-main-content">

          {/* Floating Menu Button for Mobile */}
          <button
            className="patt-mobile-fab"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <div className="patt-content-card">

            <div className="patt-content-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 className="patt-header-title">{contentData[activeTab].title}</h2>
              </div>

              <div className="patt-header-nav-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                {prevTabKey && (
                  <button
                    className="patt-nav-action-btn patt-prev-btn"
                    onClick={() => setActiveTab(prevTabKey)}
                    title="Previous Topic"
                    aria-label={`Previous: ${contentData[prevTabKey].title}`}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  >
                    &larr; Prev
                  </button>
                )}
                {nextTabKey && (
                  <button
                    className="patt-nav-action-btn patt-next-btn"
                    onClick={() => setActiveTab(nextTabKey)}
                    title="Next Topic"
                    aria-label={`Next: ${contentData[nextTabKey].title}`}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                  >
                    Next &rarr;
                  </button>
                )}
              </div>
            </div>

            <div className="patt-sections-wrapper">
              {contentData[activeTab].sections.map((section, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-up"
                  delay={index * 50}
                  duration={500}
                >
                  <div
                    className="patt-content-section"
                    style={{
                      marginLeft: section.isSubSubtopic ? '2.5rem' : section.isSubtopic ? '1.25rem' : '0',
                      borderLeft: (section.isSubtopic || section.isSubSubtopic) ? '3px solid #e5e7eb' : 'none',
                      paddingLeft: (section.isSubtopic || section.isSubSubtopic) ? '1.25rem' : '1.75rem'
                    }}
                  >
                    <h3 className="patt-section-title" style={(section.isSubtopic || section.isSubSubtopic) ? { fontSize: '1.05rem', color: '#4b5563' } : {}}>
                      <span className="patt-section-marker" style={(section.isSubtopic || section.isSubSubtopic) ? { height: '0.875rem', background: '#9ca3af' } : {}}></span>
                      {section.heading}
                    </h3>

                    {section.text && (
                      <p className="patt-section-text">{section.text}</p>
                    )}

                    {section.content && (
                      <ul className="patt-section-list">
                        {section.content.map((item, i) => (
                          <li key={i} className="patt-list-item">
                            <span className="patt-bullet-dot"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.customContent && (
                      <div className="patt-section-custom">
                        {section.customContent}
                      </div>
                    )}

                    {section.image && (
                      <figure className="patt-section-image-wrapper">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="patt-section-image"
                          loading="lazy" /* Lazy load content images */
                        />
                        {section.imageCaption && (
                          <figcaption className="patt-image-caption">
                            {section.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {section.table && (
                      <div className="patt-table-container">
                        <div className="patt-table-swipe-hint">
                          <span>← Swipe to see more →</span>
                        </div>
                        <table className="patt-zoo-table">
                          <thead>
                            <tr>
                              {section.table.headers.map((header, hIndex) => (
                                <th key={hIndex}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, rIndex) => (
                              <tr key={rIndex}>
                                {row.map((cell, cIndex) => (
                                  <td key={cIndex}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.examples && (
                      <div className="patt-example-block">
                        <span className="patt-example-label">Examples</span>
                        <ul className="patt-example-list">
                          {section.examples.map((ex, i) => (
                            <li key={i}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="patt-navigation-footer">
              {prevTabKey ? (
                <button
                  className="patt-nav-action-btn patt-prev-btn"
                  onClick={() => setActiveTab(prevTabKey)}
                >
                  &larr; Previous
                </button>
              ) : (
                <div></div>
              )}

              {nextTabKey && (
                <button
                  className="patt-nav-action-btn patt-next-btn"
                  onClick={() => setActiveTab(nextTabKey)}
                >
                  Next &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </div >

      {/* BACK TO TOP BUTTON */}
      <button
        className={`patt-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>
    </div >
  );
};

export default Patterns;