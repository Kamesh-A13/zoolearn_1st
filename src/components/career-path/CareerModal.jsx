
import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const CareerModal = ({ career, category, onClose, onCourseClick, isPanelActive }) => {
    if (!career) return null;

    // Generate nodes and edges for ReactFlow
    const { nodes, edges } = useMemo(() => {
        const nodes = [];
        const edges = [];
        let y = 50;

        // Helper to add nodes for a level
        const addLevelNodes = (levelCourses, levelLabel, type, startY) => {
            const xOffset = 200;
            levelCourses.forEach((course, index) => {
                const id = `${type}-${index}`;
                nodes.push({
                    id,
                    data: { label: course },
                    position: { x: (index - (levelCourses.length - 1) / 2) * xOffset + 400, y: startY },
                    className: `course-node ${type}`,
                    // Add data for click handler
                    data: { label: course, onClick: () => onCourseClick(course) }
                });
            });
        };

        addLevelNodes(career.bsc, 'Bachelor', 'bsc', y);
        y += 150;
        addLevelNodes(career.msc, 'Master', 'msc', y);
        y += 150;
        addLevelNodes(career.phd, 'Doctoral', 'phd', y);

        // Create edges (simple linear flow for now)
        career.bsc.forEach((_, bIdx) => {
            career.msc.forEach((_, mIdx) => {
                edges.push({ id: `e-b${bIdx}-m${mIdx}`, source: `bsc-${bIdx}`, target: `msc-${mIdx}`, animated: true });
            });
        });
        career.msc.forEach((_, mIdx) => {
            career.phd.forEach((_, pIdx) => {
                edges.push({ id: `e-m${mIdx}-p${pIdx}`, source: `msc-${mIdx}`, target: `phd-${pIdx}`, animated: true });
            });
        });

        return { nodes, edges };
    }, [career]);

    const onNodeClick = (event, node) => {
        if (node.data && node.data.onClick) {
            node.data.onClick();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-content ${isPanelActive ? 'shifted' : ''}`}
                onClick={(e) => e.stopPropagation()}
                style={{ borderTop: `10px solid ${category?.theme?.primary || '#48bb78'}` }}
            >
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2 style={{ fontSize: '2.4rem', color: category?.theme?.secondary || '#14532d', marginBottom: '10px', fontWeight: 900 }}>
                        {career.title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#4a5568', maxWidth: '700px', margin: '0 auto' }}>
                        {career.desc}
                    </p>
                </div>

                <div className="modal-body">
                    <h3 className="pathway-title" style={{ marginTop: '20px', color: category?.theme?.primary }}>
                        Educational Pathway Explorer
                    </h3>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', marginBottom: '15px' }}>
                        Scroll to zoom • Drag to pan • Click degrees to view course details
                    </p>

                    <div className="reactflow-container">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodeClick={onNodeClick}
                            fitView
                            zoomOnScroll={true}
                            panOnDrag={true}
                            nodesDraggable={false}
                            nodesConnectable={false}
                            elementsSelectable={true}
                        >
                            <Background color="#e2e8f0" gap={20} />
                            <Controls showInteractive={false} />
                        </ReactFlow>
                    </div>

                    <div className="salary-banner" style={{ background: category?.theme?.gradient || 'linear-gradient(135deg, #f6e05e 0%, #ecc94b 100%)', color: category?.theme?.secondary ? '#fff' : '#744210' }}>
                        <span style={{ fontSize: '1.5rem' }}>💰</span>
                        <span>Average Salary Outcome: <strong>{career.salary}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerModal;
