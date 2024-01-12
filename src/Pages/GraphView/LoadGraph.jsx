import { useEffect, useState, useCallback, useMemo, memo } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import { Tabs, Tab } from "@nextui-org/react";
import Button from "@mui/material/Button";
import { generateInitialNodes } from "./InitialNodes"; // Import the initialNodes function
import { generateInitialEdges } from "./InitialEdges"; // Import the initialEdges function
import CustomNode from "./CustomNode";
import ReactFlow, {
  ReactFlowProvider,
  Controls, //import control bar
  Panel,
  Background, //import pattern background
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { truncateLabel } from "../Address/truncateLabel";
import axios from "axios";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";

// Initialize an ELK instance to calculate graph layouts
const elk = new ELK();

const useLayoutedElements = () => {
  // Methods from useReactFlow to manage node and edge states and transformations
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
  };

  const getLayoutedElements = useCallback((options) => {
    // Combine default and received options for layout
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    // Use ELK to calculate and set the layout of nodes and edges
    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

// LayoutFlow Component: Displays an interactive graph visualization using ReactFlow
const LayoutFlow = () => {
  // Extract node data from global context
  const { AllNodes, UniqueTransactions } = UseNodeContext();
  
  // States for managing nodes and edges in the graph
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTab, setSelectedTab] = useState("vertical");
  
  // Define the custom node type used in the graph
  const nodeTypes = useMemo(() => ({ CustomNode: CustomNode }), []);
  
  // Extract layout method from custom hook
  const { getLayoutedElements } = useLayoutedElements();

  // Effect hook to adjust layout upon tab selection
  useEffect(() => {
    if (selectedTab === "vertical") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "DOWN",
      });
    } else if (selectedTab === "horizontal") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
      });
    } else if (selectedTab === "force") {
      getLayoutedElements({
        "elk.algorithm": "org.eclipse.elk.force",
      });
    }
  }, [selectedTab, setSelectedTab]);

  // Effect hook to initialize nodes and edges in the graph
  useEffect(() => {
    const initialNodes = generateInitialNodes(AllNodes);
    setNodes(initialNodes);
    const initialEdges = generateInitialEdges(UniqueTransactions);
    setEdges(initialEdges);
  }, [AllNodes, UniqueTransactions]);

  return (
    <div className="relative w-full h-full bg-neutral-950 rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        {/* Control bar from ReactFlow */}
        <Controls className="bg-white"/>
        {/* Panel for layout direction tabs */}
        <Panel position="top-right">
          <Tabs value={selectedTab} onSelectionChange={setSelectedTab}>
            <Tab key="vertical" title="Vertical" />
            <Tab key="horizontal" title="Horizontal" />
            <Tab key="force" title="Force Layout" />
          </Tabs>
        </Panel>
        {/* Background pattern from ReactFlow */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export const LoadGraph = () => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
};
export default LoadGraph;
