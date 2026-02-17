import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Sparkles, Leaf, Fish, Bird, Bug } from 'lucide-react';
import './NotFound404.css';

// Zoology facts for the discovery sections
const zoologyFacts = [
    {
        icon: '🦎',
        title: 'Chameleon Vision',
        fact: 'Chameleons can move their eyes independently, allowing them to look in two different directions at once!',
        category: 'Reptiles'
    },
    {
        icon: '🐙',
        title: 'Octopus Intelligence',
        fact: 'Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps it to the body.',
        category: 'Mollusca'
    },
    {
        icon: '🦋',
        title: 'Butterfly Migration',
        fact: 'Monarch butterflies travel up to 3,000 miles during their annual migration from Canada to Mexico!',
        category: 'Arthropoda'
    },
    {
        icon: '🐋',
        title: 'Blue Whale Heart',
        fact: "A blue whale's heart is so large that a small child could crawl through its major arteries.",
        category: 'Chordata'
    },
    {
        icon: '🦠',
        title: 'Tardigrade Survival',
        fact: 'Tardigrades can survive in space! They can withstand extreme temperatures, radiation, and even the vacuum of space.',
        category: 'Micro Life'
    }
];

// Endangered species Easter egg
const endangeredSpecies = {
    icon: '🐼',
    name: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    status: 'Vulnerable',
    message: 'You discovered a hidden treasure! Giant pandas were upgraded from "Endangered" to "Vulnerable" in 2016 thanks to conservation efforts.',
    funFact: 'Pandas spend about 12 hours a day eating bamboo!'
};

// Animal footprint trail positions
const footprints = [
    { x: 15, y: 20, rotation: -15, delay: 0 },
    { x: 25, y: 35, rotation: 10, delay: 0.2 },
    { x: 18, y: 50, rotation: -5, delay: 0.4 },
    { x: 30, y: 65, rotation: 20, delay: 0.6 },
    { x: 22, y: 80, rotation: -10, delay: 0.8 },
];

const NotFound404 = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const factRefs = useRef([]);
    const easterEggRef = useRef(null);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Check which sections are visible
            factRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.8) {
                        setVisibleSections(prev => new Set([...prev, index]));
                    }
                }
            });

            // Easter egg trigger (at the very bottom)
            if (easterEggRef.current) {
                const rect = easterEggRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    setShowEasterEgg(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse tracking for parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="nf404-page" ref={containerRef}>
            {/* Animated background elements */}
            <div className="nf404-bg-elements">
                <div
                    className="nf404-floating-element nf404-dna"
                    style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
                >
                    🧬
                </div>
                <div
                    className="nf404-floating-element nf404-leaf"
                    style={{ transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)` }}
                >
                    🍃
                </div>
                <div
                    className="nf404-floating-element nf404-cell"
                    style={{ transform: `translate(${mousePos.x * 0.7}px, ${-mousePos.y * 0.4}px)` }}
                >
                    🔬
                </div>
            </div>

            {/* Footprint trail */}
            <div className="nf404-footprints">
                {footprints.map((fp, index) => (
                    <div
                        key={index}
                        className="nf404-footprint"
                        style={{
                            left: `${fp.x}%`,
                            top: `${fp.y}px`,
                            transform: `rotate(${fp.rotation}deg)`,
                            animationDelay: `${fp.delay}s`,
                        }}
                    >
                        🐾
                    </div>
                ))}
            </div>

            {/* HERO SECTION */}
            <section className="nf404-hero">
                <div className="nf404-hero-content">
                    {/* Animated 404 number */}
                    <div className="nf404-number-container">
                        <span className="nf404-number nf404-num-4-left">4</span>
                        <div className="nf404-animal-circle">
                            <div className="nf404-animal-spinner">
                                <span className="nf404-animal">🦕</span>
                            </div>
                        </div>
                        <span className="nf404-number nf404-num-4-right">4</span>
                    </div>

                    <h1 className="nf404-title">
                        This species seems to be missing
                        <span className="nf404-paw">🐾</span>
                    </h1>

                    <p className="nf404-subtitle">
                        The page you're looking for has migrated to another habitat,
                        or perhaps it's still evolving...
                    </p>

                    {/* Navigation buttons */}
                    <div className="nf404-buttons">
                        <Link to="/" className="nf404-btn nf404-btn-primary">
                            <Home size={20} />
                            Back to Habitat
                        </Link>
                        <button
                            onClick={() => navigate(-1)}
                            className="nf404-btn nf404-btn-secondary"
                        >
                            <ArrowLeft size={20} />
                            Retrace Steps
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    <div className="nf404-scroll-indicator">
                        <span>Scroll to discover zoology facts</span>
                        <div className="nf404-scroll-arrow">↓</div>
                    </div>
                </div>
            </section>

            {/* DISCOVERY SECTION */}
            <section className="nf404-discovery">
                <h2 className="nf404-section-title">
                    <Sparkles size={24} />
                    While you're here, discover some amazing facts!
                </h2>

                <div className="nf404-facts-grid">
                    {zoologyFacts.map((item, index) => (
                        <div
                            key={index}
                            ref={el => factRefs.current[index] = el}
                            className={`nf404-fact-card ${visibleSections.has(index) ? 'nf404-visible' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="nf404-fact-icon">{item.icon}</div>
                            <span className="nf404-fact-category">{item.category}</span>
                            <h3 className="nf404-fact-title">{item.title}</h3>
                            <p className="nf404-fact-text">{item.fact}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEARCH SECTION */}
            <section className="nf404-search-section">
                <div className="nf404-search-content">
                    <h2>Looking for something specific?</h2>
                    <p>Explore our ZooHub to discover over 500+ species!</p>
                    <Link to="/zoohub" className="nf404-btn nf404-btn-explore">
                        <Bug size={20} />
                        Explore ZooHub
                    </Link>
                </div>
            </section>

            {/* EASTER EGG - Endangered Species */}
            <section
                ref={easterEggRef}
                className={`nf404-easter-egg ${showEasterEgg ? 'nf404-revealed' : ''}`}
            >
                <div className="nf404-egg-content">
                    <div className="nf404-egg-badge">🏆 Hidden Discovery!</div>
                    <div className="nf404-egg-icon">{endangeredSpecies.icon}</div>
                    <h3 className="nf404-egg-name">{endangeredSpecies.name}</h3>
                    <p className="nf404-egg-scientific">{endangeredSpecies.scientificName}</p>
                    <span className={`nf404-status nf404-status-${endangeredSpecies.status.toLowerCase()}`}>
                        {endangeredSpecies.status}
                    </span>
                    <p className="nf404-egg-message">{endangeredSpecies.message}</p>
                    <div className="nf404-egg-funfact">
                        <Leaf size={16} />
                        <span>{endangeredSpecies.funFact}</span>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="nf404-final-cta">
                <div className="nf404-cta-content">
                    <span className="nf404-cta-emoji">🦎🐙🦋🐋🦠</span>
                    <h2>Ready to continue your journey?</h2>
                    <Link to="/" className="nf404-btn nf404-btn-large">
                        <Home size={24} />
                        Return to Home
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default NotFound404;
