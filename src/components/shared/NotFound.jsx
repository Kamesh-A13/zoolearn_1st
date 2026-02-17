import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';
import './shared.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <div className="notfound-icon-wrapper">
                <Search size={80} strokeWidth={1.5} />
            </div>
            <h1 className="notfound-code">404</h1>
            <h2 className="notfound-title">Page Not Found</h2>
            <p className="notfound-message">
                Oops! The species you're looking for seems to have migrated elsewhere.
            </p>
            <div className="notfound-buttons">
                <Link to="/" className="notfound-btn notfound-btn-primary">
                    <Home size={18} />
                    Go Home
                </Link>
                <button
                    onClick={() => navigate(-1)}
                    className="notfound-btn notfound-btn-secondary"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
