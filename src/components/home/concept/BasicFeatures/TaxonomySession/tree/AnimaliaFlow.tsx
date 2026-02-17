import { useState, useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  ProOptions,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";

import CustomNode from "./CustomNode";
import { animaliaTree } from "./data/animaliaData";

const nodeTypes = {
  custom: CustomNode,
};

const proOptions: ProOptions = { hideAttribution: true };

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

interface FlowProps {
  isEmbedded?: boolean;
}

function FlowContent({ isEmbedded = false }: FlowProps) {
  const navigate = useNavigate();
  const { fitView } = useReactFlow();

  // --- RESPONSIVE STATE ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // --- LOGIC STATE ---
  const [isLocked, setIsLocked] = useState(isEmbedded);
  const [openNodes, setOpenNodes] = useState<Record<string, string>>({});
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Listen for resize to adjust layout dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- HANDLERS ---
  const handleNodeClick = (parentId: string, node: TreeNode) => {
    setActiveNode(node.id);

    if (!node.children || node.children.length === 0) {
      navigate(`/animal/${node.id}`);
      return;
    }

    setOpenNodes((prev) => ({
      ...prev,
      [parentId]: prev[parentId] === node.id ? "" : node.id,
    }));
  };

  const handleResetView = useCallback(() => {
    fitView({ duration: 800, padding: 0.2 });
  }, [fitView]);

  const handleResetTree = useCallback(() => {
    setOpenNodes({});
    setActiveNode(null);
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 100);
  }, [fitView]);

  // --- BUILD TREE ---
  // Memoize nodes to prevent flickering during interactions
  const { nodes, edges } = useMemo(() => {
    const nodesList: Node[] = [];
    const edgesList: Edge[] = [];
    const spacingX = isMobile ? 140 : 220; // Tighter spacing on mobile
    const spacingY = 120;

    const buildTreeRecursive = (node: TreeNode, x: number, y: number, parent?: string) => {
      const isLeaf = !node.children || node.children.length === 0;

      nodesList.push({
        id: node.id,
        type: "custom",
        position: { x, y },
        data: {
          label: node.label,
          isLeaf,
          isActive: activeNode === node.id,
          onClick: () => handleNodeClick(parent ?? "root", node),
        },
      });

      if (parent) {
        edgesList.push({
          id: `${parent}-${node.id}`,
          source: parent,
          target: node.id,
          animated: true,
          style: { stroke: "#555", strokeWidth: 2 },
        });
      }

      if (!node.children) return;
      const openChild = openNodes[parent ?? "root"];
      if (parent && openChild !== node.id) return;

      node.children.forEach((child, index) => {
        const offset = (index - (node.children.length - 1) / 2) * spacingX;
        buildTreeRecursive(child, x + offset, y + spacingY, node.id);
      });
    };

    buildTreeRecursive(animaliaTree, 0, 0);
    return { nodes: nodesList, edges: edgesList };
  }, [openNodes, activeNode, isMobile]);

  // Initial Fit
  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [fitView]);

  return (
    <div style={{ height: "100%", width: "100%", background: "#121212", position: 'relative' }}>
      
      {/* Interaction Overlay (when locked) */}
      {isLocked && (
        <div 
          onClick={() => setIsLocked(false)}
          style={{
            position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer',
            background: 'rgba(0,0,0,0.01)' // Transparent catch-all
          }}
          title="Tap to interact"
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        panOnDrag={!isLocked}
        zoomOnScroll={!isLocked}
        zoomOnPinch={!isLocked}
        zoomOnDoubleClick={!isLocked}
        preventScrolling={false}
        proOptions={proOptions}
      >
        <Background color="#333" gap={24} size={1} />
        
        {/* --- PROFESSIONAL FLOATING TOOLBAR --- */}
        <Panel 
          position={isMobile ? "bottom-center" : "bottom-right"} 
          style={{ 
            marginBottom: 24, 
            marginRight: isMobile ? 0 : 24,
            display: "flex",
            gap: "12px",
            alignItems: "flex-end"
          }}
        >
          {/* Glassmorphism Toolbar Container */}
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(30, 30, 30, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: '8px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            
            {/* Reset Tree */}
            <button 
              onClick={handleResetTree} 
              style={iconBtnStyle}
              title="Reset Tree"
            >
              <span style={{ fontSize: '1.2rem' }}>⟲</span>
              {!isMobile && <span style={textStyle}>Reset Tree</span>}
            </button>

            {/* Divider */}
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)', margin: '2px 0' }} />

            {/* Reset View */}
            <button 
              onClick={handleResetView} 
              style={iconBtnStyle}
              title="Fit View"
            >
              <span style={{ fontSize: '1.2rem' }}>⛶</span>
              {!isMobile && <span style={textStyle}>Reset View</span>}
            </button>

            {/* Lock Toggle (Only if Embedded) */}
            {isEmbedded && (
              <>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)', margin: '2px 0' }} />
                <button
                  onClick={() => setIsLocked(!isLocked)}
                  style={{
                    ...iconBtnStyle,
                    background: isLocked ? 'rgba(47, 116, 50, 0.2)' : 'transparent',
                    color: isLocked ? '#4ade80' : '#ccc',
                    border: isLocked ? '1px solid rgba(47, 116, 50, 0.5)' : '1px solid transparent'
                  }}
                  title={isLocked ? "Unlock Scroll" : "Lock Scroll"}
                >
                  <span style={{ fontSize: '1.1rem' }}>{isLocked ? "🔒" : "🔓"}</span>
                  {!isMobile && <span style={textStyle}>{isLocked ? "Scroll Locked" : "Zoom Enabled"}</span>}
                </button>
              </>
            )}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

// --- STYLES ---

const iconBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#e0e0e0",
  border: "1px solid transparent",
  borderRadius: "10px",
  cursor: "pointer",
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.2s ease",
  minWidth: "44px", // Ensure tap target size
  height: "40px"
};

const textStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.3px",
  whiteSpace: "nowrap"
};

export default function AnimaliaFlow({ isEmbedded }: FlowProps) {
  return (
    <ReactFlowProvider>
      <FlowContent isEmbedded={isEmbedded} />
    </ReactFlowProvider>
  );
}