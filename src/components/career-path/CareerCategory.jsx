
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { careerCategories, courseDetails } from '../../data/careersData';
import CareerModal from './CareerModal';
import CoursePanel from './CoursePanel';
import './CareerPath.css';

const CareerCategory = () => {
    const { categoryId } = useParams();
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);

    const category = careerCategories.find(cat => cat.id === categoryId);

    if (!category) {
        return (
            <div className="category-detail-container">
                <Link to="/career-path" className="back-link">← Back to Categories</Link>
                <h1>Category not found</h1>
            </div>
        );
    }

    const handleCareerClick = (career) => {
        setSelectedCareer(career);
        setIsModalOpen(true);
    };

    const handleCourseClick = (courseName) => {
        const details = courseDetails[courseName] || {
            exp: "Detailed information about this course.",
            dur: "2-3 years",
            imp: "Important course for specialization in this field."
        };
        setSelectedCourse({ name: courseName, ...details });
        setIsPanelActive(true);
    };

    const closeAll = () => {
        setIsModalOpen(false);
        setIsPanelActive(false);
        setTimeout(() => {
            setSelectedCareer(null);
            setSelectedCourse(null);
        }, 300);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    return (
        <div
            className="category-detail-container"
            style={{ backgroundColor: category.theme?.accent || '#f8fafc' }}
        >
            <Link to="/career-path" className="back-link">
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>←</span>
                Back to Categories
            </Link>

            <div className="career-path-header">
                <h1 style={{ color: category.theme?.secondary || '#2d3748' }}>
                    {category.name}
                </h1>
                <p>{category.description}</p>
            </div>

            <div className="career-grid">
                {category.careers.map((career, index) => (
                    <div
                        key={index}
                        className="career-card"
                        onClick={() => handleCareerClick(career)}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            borderLeft: `5px solid ${category.theme?.primary || '#48bb78'}`
                        }}
                    >
                        <h3 className="career-card-title">{career.title}</h3>
                        <p className="career-card-desc">{career.desc}</p>
                        <div style={{
                            marginTop: '15px',
                            fontSize: '0.9rem',
                            color: category.theme?.primary,
                            fontWeight: 700
                        }}>
                            View Pathway →
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CareerModal
                    career={selectedCareer}
                    category={category}
                    onClose={closeAll}
                    onCourseClick={handleCourseClick}
                    isPanelActive={isPanelActive}
                />
            )}

            <CoursePanel
                course={selectedCourse}
                isActive={isPanelActive}
                onClose={closePanel}
            />
        </div>
    );
};

export default CareerCategory;
