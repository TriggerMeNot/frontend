import { useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
  SelectionMode,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { DevTools } from "@/components/devtools";

import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';

import Discord from "./CustomNodes/Discord";
import Git from "./CustomNodes/Git";
import Microsoft from "./CustomNodes/Microsoft";

// const initialNodes = [
//   { id: '1', data: { label: 'Hello' }, sourcePosition: 'right', targetPosition: 'null', position: { x: -169, y: 0 }, type: "input" },
//   { id: '3', data: { label: 'Discord' }, position: { x: -169, y: 127 }, type: "discord" },
//   { id: '2', data: { label: 'World' }, sourcePosition: 'right', targetPosition: 'left', position: { x: 100, y: 100 } },
// ];

const nodeColor = (node: any) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    case 'discord':
      return '#055dff';
    case 'git':
      return '#d6d27a';
    case 'microsoft':
      return '#3ba853';
    default:
      return '#ff0072';
  }
};

const nodeTypes = {
  discord: Discord,
  git: Git,
  microsoft: Microsoft,
};

const panOnDrag = [1, 2];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  return (
    <div className="flex-row flex grow h-full">
      <Sidebar />
      <div className="relative h-screen w-full p-10 text-black lg:flex bg-zinc-900">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          selectionOnDrag
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          <DevTools />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);