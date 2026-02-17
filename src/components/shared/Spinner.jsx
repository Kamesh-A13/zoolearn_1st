import React from 'react';
import './shared.css';

const Spinner = ({ size = 'md', text = '', fullPage = false }) => {
    const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';

    return (
        <div className={`spinner-container ${fullPage ? 'spinner-fullpage' : ''}`}>
            <div className={`spinner ${sizeClass}`}></div>
            {text && <p className="spinner-text">{text}</p>}
        </div>
    );
};

export default Spinner;
