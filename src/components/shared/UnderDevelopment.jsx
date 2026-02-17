import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Construction, Home, Bell, CheckCircle, Heart } from 'lucide-react';
import './shared.css';

const UnderDevelopment = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            // Here you would typically send the email to your backend
        }
    };

    return (
        <div className="underdevelopment-container">
            <div className="underdevelopment-card">
                <div className="underdevelopment-icon-wrapper">
                    <Construction size={64} strokeWidth={1.5} />
                </div>

                <h1 className="underdevelopment-title">Under Construction</h1>

                <p className="underdevelopment-message">
                    We're building something amazing! This feature is currently in the lab
                    and will be ready for you soon.
                </p>

                <div className="underdevelopment-progress-container">
                    <div className="underdevelopment-progress-label">
                        <span>Development Progress</span>
                        <span>75%</span>
                    </div>
                    <div className="underdevelopment-progress-bar">
                        <div className="underdevelopment-progress-fill"></div>
                    </div>
                </div>

                {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="underdevelopment-notify-form">
                        <p className="underdevelopment-notify-text">Get notified when it's ready:</p>
                        <div className="underdevelopment-input-group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="underdevelopment-input"
                                required
                            />
                            <button type="submit" className="underdevelopment-notify-btn">
                                <Bell size={18} />
                                Notify Me
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="underdevelopment-success">
                        <CheckCircle size={24} className="text-green-500" />
                        <p>Thanks! We'll notify you when this page launches.</p>
                    </div>
                )}

                <div className="underdevelopment-support-wrapper">
                    <button
                        className="underdevelopment-support-btn"
                        onClick={() => setShowSupport(!showSupport)}
                    >
                        <Heart className="support-heart-icon" fill="white" size={20} />
                        {showSupport ? "Close Support" : "Support Our Mission"}
                    </button>

                    {showSupport && (
                        <div className="underdevelopment-support-card">
                            <img
                                src="https://res.cloudinary.com/dmdo1gixv/image/upload/v1769677280/WhatsApp_Image_2026-01-29_at_14.13.13_qq2t9c.jpg"
                                alt="Donate QR Code"
                                className="support-qr-image"
                            />
                            <p className="support-text-highlight">
                                <strong>Help Us Grow!</strong> Scanning this QR code helps us build better tools for you.
                            </p>
                            <p className="support-subtext">
                                Please provide your details while donating us.
                            </p>
                        </div>
                    )}
                </div>

                <div className="underdevelopment-buttons">
                    <Link to="/" className="underdevelopment-home-btn">
                        <Home size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnderDevelopment;
