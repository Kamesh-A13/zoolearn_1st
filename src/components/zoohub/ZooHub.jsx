import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import './ZooHub.css';

// Components
import Porifera from "./porifera/Porifera";
import Platyhelminthes from "./Plathyhelminthes/Platyhelminthes";
import Coelenterata from "./coelenterata/Coelenterata";
import Ctenophora from "./ctenophora/Ctenophora";
import Aschelminthes from "./aschelminthes/Aschelminthes";
import Annelida from "./annelida/Annelida";
import Arthropoda from "./arthropoda/Arthropoda";
import Mollusca from "./mollusca/Mollusca";
import Echinodermata from "./echinodermata/Echinodermata";
import Hemichordata from "./hemichordata/Hemichordata";

// Shared components
import { ScrollReveal } from "../shared/ScrollReveal";
import Skeleton, { SkeletonSearchItem } from "../shared/Skeleton";

// CountUp Animation Component
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeProgress = 1 - (1 - percentage) * (1 - percentage);
      setCount(Math.floor(easeProgress * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return <span>{count}</span>;
};

function ZooHub() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track if sticky bar should be visible
  const [isSticky, setIsSticky] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false); // Toggle floating panel
  const bannerRef = useRef(null);



  // 🔗 refs for all phyla
  const refs = {
    porifera: useRef(null),
    coelenterata: useRef(null),
    ctenophora: useRef(null),
    platyhelminthes: useRef(null),
    aschelminthes: useRef(null),
    annelida: useRef(null),
    arthropoda: useRef(null),
    mollusca: useRef(null),
    echinodermata: useRef(null),
    hemichordata: useRef(null),
    chordata: useRef(null),
  };

  // 🔍 search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Phylum icons/emojis for visual enhancement
  const phylumIcons = {
    porifera: "🧽",
    coelenterata: "🌊",
    ctenophora: "💫",
    platyhelminthes: "🪱",
    aschelminthes: "🦠",
    annelida: "🐛",
    arthropoda: "🦀",
    mollusca: "🐙",
    echinodermata: "⭐",
    hemichordata: "🔬",
    chordata: "🐟"
  };

  // Phylum colors for badges
  const phylumColors = {
    porifera: "#e74c3c",
    coelenterata: "#3498db",
    ctenophora: "#9b59b6",
    platyhelminthes: "#f39c12",
    aschelminthes: "#1abc9c",
    annelida: "#e67e22",
    arthropoda: "#e91e63",
    mollusca: "#00bcd4",
    echinodermata: "#4caf50",
    hemichordata: "#795548",
    chordata: "#2196f3"
  };

  // Track scroll to make sticky bar appear after banner
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
        // When banner scrolls above viewport, show sticky bar
        setIsSticky(bannerBottom <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔗 Auto-scroll based on URL route
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const phylumFromUrl = pathParts[pathParts.length - 1];

    if (phylumFromUrl && refs[phylumFromUrl]) {
      setTimeout(() => {
        refs[phylumFromUrl]?.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.pathname]);

  // 🧠 FULL SPECIES LIST with thumbnails
  const speciesMap = [
    // ========== PORIFERA ==========
    { name: "sycon", classKey: "porifera", route: "/zoohub/porifera/sycon", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sycon_sp.jpg/200px-Sycon_sp.jpg" },
    { name: "leucosolenia", classKey: "porifera", route: "/zoohub/porifera/leucosolenia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Leucosolenia_botryoides.jpg/200px-Leucosolenia_botryoides.jpg" },
    { name: "grantia", classKey: "porifera", route: "/zoohub/porifera/grantia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Grantia_sp.jpg/200px-Grantia_sp.jpg" },
    { name: "euplectella", classKey: "porifera", route: "/zoohub/porifera/euplectella", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Euplectella_aspergillum.jpg/200px-Euplectella_aspergillum.jpg" },
    { name: "hyalonema", classKey: "porifera", route: "/zoohub/porifera/hyalonema", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Hyalonema_sieboldi.jpg/200px-Hyalonema_sieboldi.jpg" },
    { name: "spongilla", classKey: "porifera", route: "/zoohub/porifera/spongilla", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Spongilla_lacustris.jpg/200px-Spongilla_lacustris.jpg" },
    { name: "euspongia", classKey: "porifera", route: "/zoohub/porifera/euspongia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Euspongia_officinalis.jpg/200px-Euspongia_officinalis.jpg" },
    { name: "cliona", classKey: "porifera", route: "/zoohub/porifera/cliona", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cliona_celata.jpg/200px-Cliona_celata.jpg" },
    { name: "chalina", classKey: "porifera", route: "/zoohub/porifera/chalina", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Haliclona_oculata.jpg/200px-Haliclona_oculata.jpg" },
    { name: "xestospongia", classKey: "porifera", route: "/zoohub/porifera/xestospongia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Xestospongia_testudinaria.jpg/200px-Xestospongia_testudinaria.jpg" },

    // ========== COELENTERATA ==========
    { name: "hydra", classKey: "coelenterata", route: "/zoohub/coelenterata/hydra", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydra-Foto.jpg/200px-Hydra-Foto.jpg" },
    { name: "obelia", classKey: "coelenterata", route: "/zoohub/coelenterata/obelia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Obelia_geniculata.jpg/200px-Obelia_geniculata.jpg" },
    { name: "physalia", classKey: "coelenterata", route: "/zoohub/coelenterata/physalia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Portuguese_Man-O-War_%28Physalia_physalis%29.jpg/200px-Portuguese_Man-O-War_%28Physalia_physalis%29.jpg" },
    { name: "aurelia", classKey: "coelenterata", route: "/zoohub/coelenterata/aurelia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aurelia-aurita-3.jpg/200px-Aurelia-aurita-3.jpg" },
    { name: "adamsia", classKey: "coelenterata", route: "/zoohub/coelenterata/adamsia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Adamsia_palliata.jpg/200px-Adamsia_palliata.jpg" },
    { name: "pennatula", classKey: "coelenterata", route: "/zoohub/coelenterata/pennatula", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pennatula_phosphorea.jpg/200px-Pennatula_phosphorea.jpg" },
    { name: "gorgonia", classKey: "coelenterata", route: "/zoohub/coelenterata/gorgonia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Gorgonia_ventalina.jpg/200px-Gorgonia_ventalina.jpg" },
    { name: "meandrina", classKey: "coelenterata", route: "/zoohub/coelenterata/meandrina", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Meandrina_meandrites.jpg/200px-Meandrina_meandrites.jpg" },
    { name: "metridium", classKey: "coelenterata", route: "/zoohub/coelenterata/metridium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Metridium_senile.jpg/200px-Metridium_senile.jpg" },
    { name: "corallium", classKey: "coelenterata", route: "/zoohub/coelenterata/corallium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Corallium_rubrum.jpg/200px-Corallium_rubrum.jpg" },
    { name: "antipatharia", classKey: "coelenterata", route: "/zoohub/coelenterata/antipatharia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Black_coral.jpg/200px-Black_coral.jpg" },

    // ========== CTENOPHORA ==========
    { name: "ctenoplana", classKey: "ctenophora", route: "/zoohub/ctenophora/ctenoplana", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ctenoplana.jpg/200px-Ctenoplana.jpg" },
    { name: "pleurobrachia", classKey: "ctenophora", route: "/zoohub/ctenophora/pleurobrachia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Pleurobrachia_pileus.jpg/200px-Pleurobrachia_pileus.jpg" },
    { name: "hormiphora", classKey: "ctenophora", route: "/zoohub/ctenophora/hormiphora", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Hormiphora_plumosa.jpg/200px-Hormiphora_plumosa.jpg" },
    { name: "cestum", classKey: "ctenophora", route: "/zoohub/ctenophora/cestum", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cestum_veneris.jpg/200px-Cestum_veneris.jpg" },
    { name: "beroe", classKey: "ctenophora", route: "/zoohub/ctenophora/beroe", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Beroe_cucumis.jpg/200px-Beroe_cucumis.jpg" },

    // ========== PLATYHELMINTHES ==========
    { name: "dugesia", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/dugesia", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Dugesia_gonocephala.jpg/200px-Dugesia_gonocephala.jpg" },
    { name: "fasciola", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/fasciola", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fasciola_hepatica.jpg/200px-Fasciola_hepatica.jpg" },
    { name: "schistosoma", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/schistosoma", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Schistosoma_mansoni.jpg/200px-Schistosoma_mansoni.jpg" },
    { name: "taenia solium", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-solium", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Taenia_solium_scolex.jpg/200px-Taenia_solium_scolex.jpg" },
    { name: "taenia saginata", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/taenia-saginata", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Taenia_saginata.jpg/200px-Taenia_saginata.jpg" },
    { name: "echinococcus", classKey: "platyhelminthes", route: "/zoohub/platyhelminthes/echinococcus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Echinococcus_granulosus.jpg/200px-Echinococcus_granulosus.jpg" },

    // ========== ASCHELMINTHES ==========
    { name: "ascaris", classKey: "aschelminthes", route: "/zoohub/aschelminthes/ascaris", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ascaris_lumbricoides.jpg/200px-Ascaris_lumbricoides.jpg" },
    { name: "wuchereria", classKey: "aschelminthes", route: "/zoohub/aschelminthes/wuchereria", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Wuchereria_bancrofti.jpg/200px-Wuchereria_bancrofti.jpg" },

    // ========== ANNELIDA ==========
    { name: "lumbricus", classKey: "annelida", route: "/zoohub/annelida/lumbricus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lumbricus_terrestris.jpg/200px-Lumbricus_terrestris.jpg" },
    { name: "hirudinaria", classKey: "annelida", route: "/zoohub/annelida/hirudinaria", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hirudo_medicinalis.jpg/200px-Hirudo_medicinalis.jpg" },

    // ========== ARTHROPODA ==========
    { name: "periplaneta", classKey: "arthropoda", route: "/zoohub/arthropoda/periplaneta", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Periplaneta_americana.jpg/200px-Periplaneta_americana.jpg" },
    { name: "musca", classKey: "arthropoda", route: "/zoohub/arthropoda/musca", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Musca_domestica.jpg/200px-Musca_domestica.jpg" },

    // ========== MOLLUSCA ==========
    { name: "pila", classKey: "mollusca", route: "/zoohub/mollusca/pila-globosa", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pila_globosa.jpg/200px-Pila_globosa.jpg" },
    { name: "octopus", classKey: "mollusca", route: "/zoohub/mollusca/octopus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus_vulgaris.jpg/200px-Octopus_vulgaris.jpg" },

    // ========== ECHINODERMATA ==========
    { name: "asterias", classKey: "echinodermata", route: "/zoohub/echinodermata/asterias", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Asterias_rubens.jpg/200px-Asterias_rubens.jpg" },

    // ========== HEMICHORDATA ==========
    { name: "balanoglossus", classKey: "hemichordata", route: "/zoohub/hemichordata/balanoglossus", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Balanoglossus_clavigerus.jpg/200px-Balanoglossus_clavigerus.jpg" },

    // ========== CHORDATA ==========
    { name: "branchiostoma", classKey: "chordata", route: "/zoohub/chordata/branchiostoma-lanceolatum", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Branchiostoma_lanceolatum.jpg/200px-Branchiostoma_lanceolatum.jpg" },
  ];

  // 🔝 scroll to class
  const scrollToClass = (key) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔍 species search with delay for skeleton effect
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    // Show skeleton briefly for perceived performance
    setIsSearching(true);
    setTimeout(() => {
      setResults(
        speciesMap.filter((s) => s.name.includes(value))
      );
      setIsSearching(false);
    }, 200);
  };

  // 🔗 Navigate to species page
  const handleSpeciesClick = (item) => {
    navigate(item.route);
    setQuery("");
    setResults([]);
  };

  const handleSearch = () => {
    if (results.length > 0) {
      handleSpeciesClick(results[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="zoohub-page">
      {/* 🎯 BANNER - Home page style with left content + right carousel */}
      {/* 🎯 FULL SCREEN HERO BANNER */}
      <div className="zoohub-banner" ref={bannerRef}>
        <div className="zoohub-banner-overlay"></div>
        <div className="zoohub-banner-content">
          <ScrollReveal animation="fade-up" duration={1000}>
            <div className="zoohub-banner-center">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
                alt="ZooLearn Logo"
                className="zoohub-banner-logo"
              />
              <h1 className="zoohub-banner-brand">ZooHub</h1>
            </div>
          </ScrollReveal>
        </div>

        {/* 🖱️ SCROLL INDICATOR */}
        <div className="zoohub-scroll-indicator" onClick={() => scrollToClass('porifera')}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down"></div>
        </div>
      </div>

      {/* 🔍 STICKY NAV + SEARCH */}
      <div className={`zoohub-sticky-bar ${isSticky ? 'is-sticky' : ''}`}>
        {/* Class Navigation */}
        <div className="class-navbar">
          <div className="class-scroll">
            {Object.keys(refs).map((key) => (
              <span key={key} onClick={() => scrollToClass(key)}>
                {phylumIcons[key]} {key}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon-text">🔍</span>
              <input
                type="text"
                placeholder="Search species (e.g., hydra, sycon, octopus...)"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>

            {/* Enhanced Search Results with Thumbnails */}
            {(results.length > 0 || isSearching) && query && (
              <ul className="search-results">
                {isSearching ? (
                  // Skeleton loading state
                  <>
                    <SkeletonSearchItem />
                    <SkeletonSearchItem />
                    <SkeletonSearchItem />
                  </>
                ) : (
                  results.map((item, i) => (
                    <li key={i} onClick={() => handleSpeciesClick(item)} className="search-result-item">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="search-result-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="search-result-info">
                        <span className="search-result-name">{item.name}</span>
                        <span
                          className="search-result-phylum"
                          style={{ backgroundColor: phylumColors[item.classKey] + '20', color: phylumColors[item.classKey] }}
                        >
                          {phylumIcons[item.classKey]} {item.classKey}
                        </span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* 📦 PHYLUM COMPONENTS with Scroll Reveal */}
      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.porifera}>
          <Porifera />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.coelenterata}>
          <Coelenterata />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.ctenophora}>
          <Ctenophora />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.platyhelminthes}>
          <Platyhelminthes />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.aschelminthes}>
          <Aschelminthes />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.annelida}>
          <Annelida />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.arthropoda}>
          <Arthropoda />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.mollusca}>
          <Mollusca />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.echinodermata}>
          <Echinodermata />
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" duration={600}>
        <section ref={refs.hemichordata}>
          <Hemichordata />
        </section>
      </ScrollReveal>

      {/* 🔸 Remaining phyla - components to be added later */}
    </div>
  );
}

export default ZooHub;
