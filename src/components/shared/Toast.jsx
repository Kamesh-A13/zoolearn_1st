import React, { createContext, useContext, useState, useCallback } from 'react';
import './shared.css';

// Toast Context
const ToastContext = createContext(null);

// Toast Provider Component
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Date.now();
        setToasts(prev => [...prev, { ...toast, id }]);

        // Auto-remove after duration
        setTimeout(() => {
            removeToast(id);
        }, toast.duration || 4000);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.map(t =>
            t.id === id ? { ...t, exiting: true } : t
        ));

        // Remove from DOM after animation
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
    }, []);

    // Convenience methods
    const toast = {
        success: (title, message) => addToast({ type: 'success', title, message }),
        error: (title, message) => addToast({ type: 'error', title, message }),
        warning: (title, message) => addToast({ type: 'warning', title, message }),
        info: (title, message) => addToast({ type: 'info', title, message }),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`toast toast-${toast.type} ${toast.exiting ? 'toast-exiting' : ''}`}
                >
                    <span className="toast-icon">{icons[toast.type]}</span>
                    <div className="toast-content">
                        <p className="toast-title">{toast.title}</p>
                        {toast.message && <p className="toast-message">{toast.message}</p>}
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => onRemove(toast.id)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

// Custom hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastProvider;
