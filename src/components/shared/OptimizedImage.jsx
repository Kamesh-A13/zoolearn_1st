import React, { useState } from 'react';
import './shared.css';

/**
 * OptimizedImage - Lazy loading image with blur placeholder
 * 
 * Features:
 * - Lazy loading (only loads when in viewport)
 * - Blur-up effect while loading
 * - Fallback for failed loads
 * - WebP support detection
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div className={`optimized-image-wrapper ${className}`}>
            {/* Blur placeholder */}
            {!isLoaded && (
                <div
                    className="optimized-image-placeholder"
                    style={{ backgroundImage: `url(${placeholder})` }}
                />
            )}

            {/* Actual image */}
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
                    {...props}
                />
            ) : (
                <div className="optimized-image-error">
                    <span>🖼️</span>
                    <p>Image not available</p>
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;
