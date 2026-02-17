
import React from 'react';

const CoursePanel = ({ course, isActive, onClose }) => {
    return (
        <div className={`course-panel ${isActive ? 'active' : ''}`}>
            <button className="panel-back" onClick={onClose}>
                <span>←</span> Back to Career
            </button>

            {course ? (
                <>
                    <div className="panel-header">
                        <h3>{course.name}</h3>
                    </div>

                    <div className="panel-section">
                        <span className="panel-label">Explanation</span>
                        <p className="panel-value">{course.exp}</p>
                    </div>

                    <div className="panel-section">
                        <span className="panel-label">Duration</span>
                        <p className="panel-value">⏱ {course.dur}</p>
                    </div>

                    <div className="panel-section">
                        <span className="panel-label">Why it's important</span>
                        <p className="panel-value">{course.imp}</p>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px', color: '#94a3b8' }}>
                    <p>Select a course to see details</p>
                </div>
            )}
        </div>
    );
};

export default CoursePanel;
