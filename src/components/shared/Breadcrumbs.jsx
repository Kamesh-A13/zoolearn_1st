import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './shared.css';

const Breadcrumbs = () => {
    const location = useLocation();

    // Don't show breadcrumbs on home page
    if (location.pathname === '/') {
        return null;
    }

    // Parse path into breadcrumb items
    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Map path segments to readable names
    const formatSegment = (segment) => {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Build breadcrumb items with paths
    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;

        return {
            label: formatSegment(segment),
            path,
            isLast
        };
    });

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <div className="breadcrumb-item">
                <Link to="/" className="breadcrumb-link">
                    🏠 Home
                </Link>
            </div>

            {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="breadcrumb-item">
                    <span className="breadcrumb-separator">›</span>
                    {crumb.isLast ? (
                        <span className="breadcrumb-current">{crumb.label}</span>
                    ) : (
                        <Link to={crumb.path} className="breadcrumb-link">
                            {crumb.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
