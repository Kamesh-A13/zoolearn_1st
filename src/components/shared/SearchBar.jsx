import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Dna, Bug, Fish, Bird, Leaf, BookOpen } from 'lucide-react';
import './SearchBar.css';

// Import Data Files
import poriferaData from '../zoohub/porifera/Phylum1Data.json';
import coelenterataData from '../zoohub/coelenterata/Phylum2Data.json';
import ctenophoraData from '../zoohub/ctenophora/Phylum3Data.json';
import platyhelminthesData from '../zoohub/Plathyhelminthes/Phylum4Data.json';
import aschelminthesData from '../zoohub/aschelminthes/Phylum5Data.json';
import annelidaData from '../zoohub/annelida/Phylum6Data.json';
import arthropodaData from '../zoohub/arthropoda/Phylum7Data.json';
import molluscaData from '../zoohub/mollusca/MolluscaData.json';
import echinodermataData from '../zoohub/echinodermata/Phylum9Data.json';
import hemichordataData from '../zoohub/hemichordata/Phylum10Data.json';
import chordataData from '../zoohub/chordata/ChordataData.json';
import rabbitData from '../home/Organisms/rabbit/RabbitData.json';

// Type icons mapping
const typeIcons = {
    phylum: <Dna size={14} />,
    species: <Bug size={14} />,
    concept: <Leaf size={14} />,
    page: <BookOpen size={14} />,
};

const typeLabels = {
    phylum: 'Phylum',
    species: 'Species',
    concept: 'Concept',
    page: 'Page',
};

const SearchBar = ({ onClose, isOpen }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    // Build Search Index
    const searchIndex = useMemo(() => {
        const index = [];

        // 1. Pages & Concepts
        const staticPages = [
            { type: 'page', name: 'Home', path: '/', description: 'ZooLearn Homepage' },
            { type: 'page', name: 'ZooHub', path: '/zoohub', description: 'Explore the Animal Kingdom' },
            { type: 'page', name: 'Taxonomy Tree', path: '/taxonomy-tree', description: 'Interactive Classification Tree' },
            { type: 'page', name: 'About Us', path: '/about', description: 'Learn about ZooLearn' },
            { type: 'concept', name: 'The Living World', path: '/living-world', description: 'Introduction to Biodiversity' },
            { type: 'concept', name: 'Basic Features of Classification', path: '/basic-features-of-classification', description: 'Basis of Taxonomy' },
            { type: 'concept', name: 'Patterns of Complexity', path: '/anatomy', description: 'Comparative Anatomy' },
        ];
        index.push(...staticPages);

        // 2. Phyla (Main Pages)
        const phyla = [
            { name: 'Porifera', path: '/zoohub/porifera', desc: 'Sponges' },
            { name: 'Coelenterata', path: '/zoohub/coelenterata', desc: 'Cnidarians' },
            { name: 'Ctenophora', path: '/zoohub/ctenophora', desc: 'Comb Jellies' },
            { name: 'Platyhelminthes', path: '/zoohub/platyhelminthes', desc: 'Flatworms' },
            { name: 'Aschelminthes', path: '/zoohub/aschelminthes', desc: 'Roundworms' },
            { name: 'Annelida', path: '/zoohub/annelida', desc: 'Segmented Worms' },
            { name: 'Arthropoda', path: '/zoohub/arthropoda', desc: 'Insects & Crustaceans' },
            { name: 'Mollusca', path: '/zoohub/mollusca', desc: 'Molluscs' },
            { name: 'Echinodermata', path: '/zoohub/echinodermata', desc: 'Starfish & Urchins' },
            { name: 'Hemichordata', path: '/zoohub/hemichordata', desc: 'Acorn Worms' },
            { name: 'Chordata', path: '/zoohub/chordata', desc: 'Vertebrates' },
        ];
        phyla.forEach(p => {
            index.push({
                type: 'phylum',
                name: p.name,
                path: p.path,
                description: p.desc,
                icon: '🧬'
            });
        });

        // 3. Process Phylum Data Files for Species
        const processSpeciesData = (data, pName, pPath) => {
            // Handle array vs object format
            const entries = Array.isArray(data) ? data : Object.values(data);

            entries.forEach(item => {
                if (item.species) {
                    // Handle nested arrays (like in ChordataData or MolluscaData sometimes)
                    item.species.forEach(sp => {
                        index.push({
                            type: 'species',
                            name: sp.name || sp.commonName,
                            scientificName: sp.scientificName || sp.name, // Fallback
                            description: sp.description || `${pName} species`,
                            path: sp.path || `${pPath}/${sp.slug}`,
                            icon: sp.icon || '🐾'
                        });
                    });
                } else {
                    // Specific species object
                    index.push({
                        type: 'species',
                        name: item.name,
                        scientificName: item.scientificName,
                        description: typeof item.description === 'string' ? item.description : (item.introduction?.[0] || `${pName} species`),
                        path: item.path || `${pPath}/${item.slug}`,
                        icon: item.icon || '🐾'
                    });
                }
            });
        };

        // Manual processing for different data structures
        processSpeciesData(poriferaData, 'Porifera', '/zoohub/porifera');
        processSpeciesData(coelenterataData, 'Coelenterata', '/zoohub/coelenterata');
        processSpeciesData(ctenophoraData, 'Ctenophora', '/zoohub/ctenophora');
        processSpeciesData(platyhelminthesData, 'Platyhelminthes', '/zoohub/platyhelminthes');
        processSpeciesData(aschelminthesData, 'Aschelminthes', '/zoohub/aschelminthes');
        processSpeciesData(annelidaData, 'Annelida', '/zoohub/annelida');
        processSpeciesData(arthropodaData, 'Arthropoda', '/zoohub/arthropoda');
        processSpeciesData(echinodermataData, 'Echinodermata', '/zoohub/echinodermata');
        processSpeciesData(hemichordataData, 'Hemichordata', '/zoohub/hemichordata');

        // Mollusca (Might need specific handling if structure varies, currently assuming array of classes)
        if (Array.isArray(molluscaData)) {
            molluscaData.forEach(cls => {
                if (cls.species) {
                    cls.species.forEach(sp => {
                        index.push({
                            type: 'species',
                            name: sp.name,
                            scientificName: sp.scientificName,
                            path: sp.path,
                            description: sp.description || `Mollusca: ${cls.className}`,
                            icon: '🐙'
                        });
                    });
                }
            });
        }

        // Chordata (Nested: Class -> Species)
        if (Array.isArray(chordataData)) {
            chordataData.forEach(cls => {
                if (cls.species) {
                    cls.species.forEach(sp => {
                        index.push({
                            type: 'species',
                            name: sp.name,
                            scientificName: sp.scientificName,
                            path: sp.path,
                            description: `Chordata: ${cls.className}`,
                            icon: '🦴'
                        });
                    });
                }
            });
        }

        // 4. Standalone Organisms
        // Rabbit
        index.push({
            type: 'species',
            name: 'Rabbit',
            scientificName: rabbitData.taxonomy?.scientificName || 'Oryctolagus cuniculus',
            path: '/rabbit',
            description: 'Mammal, Lagomorpha',
            icon: '🐰'
        });

        // Leech (Hirudinaria)
        index.push({
            type: 'species',
            name: 'Leech',
            scientificName: 'Hirudinaria granulosa',
            path: '/leech',
            description: 'Sanguivoruous Annelid',
            icon: '🩸'
        });

        // Honey Bee
        index.push({
            type: 'species',
            name: 'Honey Bee',
            scientificName: 'Apis mellifera',
            path: '/honeybee',
            description: 'Social Insect',
            icon: '🐝'
        });

        return index;
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Search logic
    const performSearch = useCallback((searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const lowerQuery = searchQuery.toLowerCase();

        const filtered = searchIndex.filter(item => {
            const nameMatch = item.name?.toLowerCase().includes(lowerQuery);
            const descMatch = item.description?.toLowerCase().includes(lowerQuery);
            const scientificMatch = item.scientificName?.toLowerCase().includes(lowerQuery);
            return nameMatch || descMatch || scientificMatch;
        });

        // Sort: exact matches first, then by type priority
        const typePriority = { phylum: 1, species: 2, concept: 3, page: 4 };
        filtered.sort((a, b) => {
            const aName = a.name?.toLowerCase() || '';
            const bName = b.name?.toLowerCase() || '';

            const aExact = aName.startsWith(lowerQuery) ? 0 : 1;
            const bExact = bName.startsWith(lowerQuery) ? 0 : 1;

            if (aExact !== bExact) return aExact - bExact;
            return typePriority[a.type] - typePriority[b.type];
        });

        setResults(filtered.slice(0, 10)); // Limit results
        setSelectedIndex(0);
        setIsLoading(false);
    }, [searchIndex]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            performSearch(query);
        }, 150);
        return () => clearTimeout(timer);
    }, [query, performSearch]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            } else if (query) {
                // If enter pressed with query but no selection, maybe specifically search?
                // For now, do nothing or select first if exists
                if (results.length > 0) handleSelect(results[0]);
            }
        } else if (e.key === 'Escape') {
            onClose?.();
        }
    };

    // Handle selection
    const handleSelect = (item) => {
        navigate(item.path);
        setQuery('');
        setResults([]);
        onClose?.();
    };

    // Scroll selected item into view
    useEffect(() => {
        if (resultsRef.current && results.length > 0) {
            const selectedEl = resultsRef.current.children[selectedIndex];
            if (selectedEl) {
                selectedEl.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex, results.length]);

    if (!isOpen) return null;

    return (
        <div className="sb-overlay" onClick={onClose}>
            <div className="sb-container" onClick={e => e.stopPropagation()}>
                {/* Search Input */}
                <div className="sb-input-wrapper">
                    <Search size={20} className="sb-search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="sb-input"
                        placeholder="Search species, phyla, concepts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    {query && (
                        <button className="sb-clear-btn" onClick={() => setQuery('')}>
                            <X size={18} />
                        </button>
                    )}
                    <kbd className="sb-kbd">ESC</kbd>
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="sb-results" ref={resultsRef}>
                        {results.map((item, index) => (
                            <div
                                key={`${item.type}-${item.path}-${index}`}
                                className={`sb-result-item ${index === selectedIndex ? 'sb-selected' : ''}`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span className="sb-result-icon">
                                    {/* Handle Emoji or Component Icon */}
                                    {typeof item.icon === 'string' ? item.icon : typeIcons[item.type]}
                                </span>
                                <div className="sb-result-content">
                                    <span className="sb-result-name">{item.name}</span>
                                    {item.scientificName && (
                                        <span className="sb-result-scientific">{item.scientificName}</span>
                                    )}
                                    {item.description && (
                                        <span className="sb-result-desc">{item.description}</span>
                                    )}
                                </div>
                                <span className={`sb-result-type sb-type-${item.type}`}>
                                    {typeIcons[item.type]}
                                    {typeLabels[item.type]}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* No results */}
                {query && results.length === 0 && !isLoading && (
                    <div className="sb-no-results">
                        <span className="sb-no-results-icon">🔍</span>
                        <p>No results found for "<strong>{query}</strong>"</p>
                        <span className="sb-no-results-hint">Try searching for a species, phylum, or concept</span>
                    </div>
                )}

                {/* Quick suggestions when empty */}
                {!query && (
                    <div className="sb-suggestions">
                        <div className="sb-suggestions-header">Quick Links</div>
                        <div className="sb-suggestions-grid">
                            <button className="sb-suggestion" onClick={() => navigate('/zoohub')}>
                                🦎 ZooHub
                            </button>
                            <button className="sb-suggestion" onClick={() => navigate('/zoohub/chordata')}>
                                🦴 Chordata
                            </button>
                            <button className="sb-suggestion" onClick={() => navigate('/zoohub/arthropoda')}>
                                🦂 Arthropoda
                            </button>
                            <button className="sb-suggestion" onClick={() => navigate('/living-world')}>
                                🌍 Living World
                            </button>
                        </div>
                        <div className="sb-keyboard-hints">
                            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                            <span><kbd>Enter</kbd> Select</span>
                            <span><kbd>Esc</kbd> Close</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
