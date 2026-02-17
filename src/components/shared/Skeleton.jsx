import React from 'react';
import './shared.css';

/**
 * Flexible Skeleton component for loading states
 * @param {string} type - Type of skeleton: text, text-sm, avatar, image, card, circle, thumbnail, search-item
 * @param {number} count - Number of skeleton elements to render
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
const Skeleton = ({ type = 'text', count = 1, className = '', style = {} }) => {
    const skeletons = Array.from({ length: count }, (_, i) => (
        <div
            key={i}
            className={`skeleton skeleton-${type} ${className}`}
            style={style}
        />
    ));

    return <>{skeletons}</>;
};

// Pre-built skeleton layouts for common use cases
export const SkeletonCard = () => (
    <div className="skeleton-card-wrapper">
        <Skeleton type="image" />
        <div className="skeleton-card-content">
            <Skeleton type="text" style={{ width: '70%' }} />
            <Skeleton type="text-sm" style={{ width: '50%' }} />
        </div>
    </div>
);

// Search result skeleton with thumbnail
export const SkeletonSearchItem = () => (
    <div className="skeleton-search-item">
        <Skeleton type="thumbnail" />
        <div className="skeleton-search-text">
            <Skeleton type="text" style={{ width: '100px' }} />
            <Skeleton type="text-sm" style={{ width: '60px' }} />
        </div>
    </div>
);

// Banner carousel skeleton
export const SkeletonCarousel = () => (
    <div className="skeleton-carousel">
        <Skeleton type="carousel-image" />
        <div className="skeleton-carousel-indicators">
            <Skeleton type="circle" />
            <Skeleton type="circle" />
            <Skeleton type="circle" />
            <Skeleton type="circle" />
            <Skeleton type="circle" />
        </div>
    </div>
);

// Species card skeleton
export const SkeletonSpeciesCard = () => (
    <div className="skeleton-species-card">
        <Skeleton type="species-image" />
        <div className="skeleton-species-info">
            <Skeleton type="text" style={{ width: '80%' }} />
            <Skeleton type="text-sm" style={{ width: '60%' }} />
            <div className="skeleton-species-tags">
                <Skeleton type="tag" />
                <Skeleton type="tag" />
            </div>
        </div>
    </div>
);

export default Skeleton;
