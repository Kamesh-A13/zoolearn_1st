import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Microscope, Dna, Globe, BookOpen } from 'lucide-react';
import './ZoologyImmersive.css';

/**
 * Custom hook for cinematic reveal on scroll
 */
const useCinematicReveal = (options = { threshold: 0.1 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(element);
            }
        }, options);

        observer.observe(element);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isVisible];
};

const ZoologyImmersive = () => {
    // Parallax effect state
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Handle scroll for parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle mouse move for subtle interaction
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="zoo-immersive-page">
            <div className="zoo-cinematic-intro">
                {/* Background Elements */}
                <div className="zoo-hero-bg">
                    <div
                        className="zoo-orb zoo-orb-1"
                        style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
                    />
                    <div
                        className="zoo-orb zoo-orb-2"
                        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
                    />
                </div>

                {/* HERO SECTION */}
                <section className="zoo-hero-section">
                    <div className="zoo-container">
                        <div className="zoo-hero-content">
                            <span className="zoo-eyebrow">Interactive Zoology Lab</span>
                            <h1 className="zoo-display-title">
                                Explore the <br />
                                <span style={{ color: 'var(--bio-accent-neon)' }}>Hidden Complexity</span> <br />
                                of Life
                            </h1>
                            <p className="zoo-hero-text">
                                Dive into the microscopic and macroscopic world of animal biology.
                                Experience evolution, anatomy, and behavior through immersive digital exploration.
                            </p>

                            <button className="zoo-cta-btn">
                                <span>Begin Expedition</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="zoo-scroll-mouse">
                        <div className="zoo-scroll-wheel"></div>
                    </div>
                </section>

                {/* CONCEPT CARDS SECTION */}
                <ScrollSection className="zoo-explore-section">
                    <div className="zoo-container">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span className="zoo-eyebrow" style={{ animation: 'none', opacity: 1, color: 'var(--bio-accent-glow)' }}>
                                Research Areas
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
                                Curated Learning Pathways
                            </h2>
                            <p style={{ color: 'var(--bio-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                                Select a field of study to reveal the interconnected patterns of the animal kingdom.
                            </p>
                        </div>

                        <div className="zoo-card-grid">
                            <GlassCard
                                icon={<Dna />}
                                title="Evolutionary Patterns"
                                desc="Trace the lineage of life from single cells to complex vertebrates."
                                delay={0}
                            />
                            <GlassCard
                                icon={<Microscope />}
                                title="Micro Anatomy"
                                desc="Examine tissue structures and cellular systems in high fidelity."
                                delay={100}
                            />
                            <GlassCard
                                icon={<Globe />}
                                title="Global Habitats"
                                desc="Understand how ecosystems shape the adaptations of living species."
                                delay={200}
                            />
                        </div>
                    </div>
                </ScrollSection>

                {/* CTA FOOTER */}
                <ScrollSection>
                    <div className="zoo-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                        <div
                            className="zoo-glass-card"
                            style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(45, 212, 191, 0.05))' }}
                        >
                            <BookOpen size={48} color="var(--bio-accent-neon)" style={{ margin: '0 auto 1.5rem' }} />
                            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
                                Ready to dive deeper?
                            </h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--bio-text-secondary)', marginBottom: '2.5rem' }}>
                                Access the full library of 50+ interactive modules and 3D models.
                            </p>
                            <button className="zoo-cta-btn" style={{ background: 'var(--bio-accent-neon)', color: '#022c22', opacity: 1, animation: 'none' }}>
                                Start Learning Now
                            </button>
                        </div>
                    </div>
                </ScrollSection>
            </div>
        </div>
    );
};

// Helper Component for Scroll Animation Wrapper
const ScrollSection = ({ children, className = '' }) => {
    const [ref, isVisible] = useCinematicReveal({ threshold: 0.15 });

    return (
        <section
            ref={ref}
            className={`zoo-scroll-reveal-section ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            {children}
        </section>
    );
};

// Helper Component for Glass Cards
const GlassCard = ({ icon, title, desc, delay }) => {
    return (
        <div
            className="zoo-glass-card"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="zoo-card-icon" style={{ color: 'var(--bio-accent-neon)' }}>
                {icon}
            </div>
            <h3 className="zoo-card-title">{title}</h3>
            <p className="zoo-card-desc">{desc}</p>
            <div className="zoo-card-link">
                Explore <ArrowRight size={16} />
            </div>
        </div>
    );
};

export default ZoologyImmersive;
