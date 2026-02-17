import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router-dom";

import CustomNode from "./CustomNode";
import { animaliaTree } from "./data/animaliaData";

/**
 * IMPORTANT:
 * nodeTypes MUST be outside the component
 * to avoid React Flow warning #002
 */
const nodeTypes = {
  custom: CustomNode,
};

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

// Internal component to access React Flow instance
function FlowContent() {
  const navigate = useNavigate();
  const { fitView } = useReactFlow();

  const [openNodes, setOpenNodes] = useState<Record<string, string>>({});
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const spacingX = window.innerWidth < 768 ? 160 : 240;
  const spacingY = 120;

  const handleNodeClick = (parentId: string, node: TreeNode) => {
    setActiveNode(node.id);

    // ✅ LEAF NODE → SPA NAVIGATION
    if (!node.children || node.children.length === 0) {
      navigate(`/animal/${node.id}`);
      return;
    }

    setOpenNodes((prev) => ({
      ...prev,
      [parentId]: prev[parentId] === node.id ? "" : node.id,
    }));
  };

  const buildTree = (
    node: TreeNode,
    x: number,
    y: number,
    parent?: string
  ) => {
    const isLeaf = !node.children || node.children.length === 0;

    nodes.push({
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
      edges.push({
        id: `${parent}-${node.id}`,
        source: parent,
        target: node.id,
        animated: true,
      });
    }

    if (!node.children) return;

    const openChild = openNodes[parent ?? "root"];
    if (parent && openChild !== node.id) return;

    node.children.forEach((child, index) => {
      const offset =
        (index - (node.children.length - 1) / 2) * spacingX;

      buildTree(child, x + offset, y + spacingY, node.id);
    });
  };

  // Build tree from root
  buildTree(animaliaTree, 0, 0);

  const onResetView = useCallback(() => {
    fitView({ duration: 800, padding: 0.2 });
  }, [fitView]);

  const onResetTree = useCallback(() => {
    setOpenNodes({});
    setActiveNode(null);
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 100);
  }, [fitView]);

  return (
    <div style={{ height: "100vh", background: "#121212" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        proOptions={{ hideAttribution: true }} // Removes the "React Flow" watermark
      >
        <Background />

        {/* Control Buttons Panel */}
        <Panel
          position="top-right"
          style={{
            marginTop: "90px", /* Offset for Header */
            marginRight: "30px",
            display: "flex",
            gap: "12px",
            padding: "8px",
            background: "rgba(30, 41, 59, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <button
            onClick={onResetTree}
            title="Collapse all nodes"
            style={{
              background: "linear-gradient(135deg, #2f7d46, #1e5231)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(47, 125, 70, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            }}
          >
            <span style={{ fontSize: "16px" }}>🔄</span> Reset Tree
          </button>

          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />

          <button
            onClick={onResetView}
            title="Center view"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "#e2e8f0",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "#e2e8f0";
            }}
          >
            <span style={{ fontSize: "16px" }}>🎯</span> Reset View
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

// Wrap with Provider to use hooks
export default function AnimaliaFlow() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}