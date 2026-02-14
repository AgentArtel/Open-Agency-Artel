import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Canvas, getCanvasTransform } from '@/components/canvas/Canvas';
import { CanvasNode } from '@/components/canvas/CanvasNode';
import { ConnectionLine } from '@/components/canvas/ConnectionLine';
import { NodeSearchPalette } from '@/components/canvas/NodeSearchPalette';
import { ConfigPanel } from '@/components/ConfigPanel';
import { BottomToolbar } from '@/components/BottomToolbar';
import { Header } from '@/components/Header';
import { useNodeDrag } from '@/hooks/useNodeDrag';
import { useConnectionDraw } from '@/hooks/useConnectionDraw';
import { getPortPosition } from '@/lib/canvasUtils';
import type { PortType } from '@/lib/portRegistry';
import type { NodeData, Connection, NodeType } from '@/types';

// Initial demo workflow
const initialNodes: NodeData[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 100, y: 150 },
    title: 'Chat Trigger',
    subtitle: 'When chat message received',
    isConfigured: true,
  },
  {
    id: 'ai-agent-1',
    type: 'ai-agent',
    position: { x: 450, y: 150 },
    title: 'AI Agent',
    subtitle: 'Tools Agent',
    isConfigured: true,
  },
  {
    id: 'openai-1',
    type: 'openai-chat',
    position: { x: 300, y: 400 },
    title: 'OpenAI Chat',
    subtitle: 'gpt-4o-mini',
    config: {
      credential: 'Open AI account 4',
      model: 'gpt-4o-mini',
    },
    isConfigured: true,
  },
  {
    id: 'memory-1',
    type: 'memory',
    position: { x: 750, y: 150 },
    title: 'Postgres Memory',
    subtitle: 'Chat memory storage',
    isDeactivated: true,
  },
];

const initialConnections: Connection[] = [
  { id: 'conn-1', from: 'trigger-1', to: 'ai-agent-1', fromPort: 'output', toPort: 'input' },
  { id: 'conn-2', from: 'ai-agent-1', to: 'openai-1', fromPort: 'tool', toPort: 'input' },
];

export const WorkflowEditorPage: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [isNodePaletteOpen, setIsNodePaletteOpen] = useState(false);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get current canvas transform
  const getTransform = useCallback(() => {
    return getCanvasTransform(canvasRef.current);
  }, []);

  // Node drag hook
  const {
    startDrag: startNodeDrag,
    handleMouseMove: handleDragMouseMove,
    handleMouseUp: handleDragMouseUp,
    isDragging: isNodeDragging,
  } = useNodeDrag({
    transform: getTransform(),
    onDrag: useCallback((nodeId: string, position: { x: number; y: number }) => {
      setNodes((prev) =>
        prev.map((n) => (n.id === nodeId ? { ...n, position } : n))
      );
    }, []),
    onDragEnd: useCallback((nodeId: string, position: { x: number; y: number }) => {
      setNodes((prev) =>
        prev.map((n) => (n.id === nodeId ? { ...n, position } : n))
      );
    }, []),
    snapToGrid: true,
    gridSize: 20,
  });

  // Connection draw hook
  const {
    startConnection,
    handleMouseMove: handleConnectionMouseMove,
    endConnection,
    tempLine,
  } = useConnectionDraw({
    transform: getTransform(),
    nodes,
    connections,
    onConnectionCreate: useCallback((connection: Connection) => {
      setConnections((prev) => [...prev, connection]);
    }, []),
  });

  // Update transform ref for hooks
  useEffect(() => {
    // Transform is now accessed directly from canvas element
  }, [nodes, connections]);

  // Combined mouse move handler
  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDragMouseMove(e);
      handleConnectionMouseMove(e);
    },
    [handleDragMouseMove, handleConnectionMouseMove]
  );

  // Combined mouse up handler
  const handleCanvasMouseUp = useCallback(
    (e: React.MouseEvent) => {
      handleDragMouseUp(e);
      endConnection(e);
    },
    [handleDragMouseUp, endConnection]
  );

  // Handle node selection
  const handleNodeClick = useCallback((nodeId: string) => {
    // Don't select if we're dragging
    if (isNodeDragging) return;
    setSelectedNodeId(nodeId);
    setSelectedConnectionId(null);
    setIsConfigPanelOpen(true);
  }, [isNodeDragging]);

  // Handle port mouse down - start connection
  const handlePortMouseDown = useCallback(
    (e: React.MouseEvent, portId: string, portType: PortType) => {
      // Find the node that owns this port
      const nodeElement = (e.target as HTMLElement).closest('[data-node-id]');
      const nodeId = nodeElement?.getAttribute('data-node-id');
      if (nodeId) {
        startConnection(e, nodeId, portId, portType);
      }
    },
    [startConnection]
  );

  // Handle port mouse up - end connection
  const handlePortMouseUp = useCallback(
    (e: React.MouseEvent, portId: string, _portType: PortType) => {
      const nodeElement = (e.target as HTMLElement).closest('[data-node-id]');
      const nodeId = nodeElement?.getAttribute('data-node-id');
      if (nodeId) {
        endConnection(e, nodeId, portId);
      }
    },
    [endConnection]
  );

  // Add new node
  const handleAddNode = useCallback((nodeType: NodeType) => {
    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type: nodeType,
      position: { x: 300, y: 200 },
      title: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
      subtitle: 'New node',
      isConfigured: false,
    };
    setNodes((prev) => [...prev, newNode]);
    setIsNodePaletteOpen(false);
  }, []);

  // Delete selected node
  const handleDeleteNode = useCallback(() => {
    if (selectedNodeId) {
      setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
      setConnections((prev) =>
        prev.filter((c) => c.from !== selectedNodeId && c.to !== selectedNodeId)
      );
      setSelectedNodeId(null);
      setIsConfigPanelOpen(false);
    }
  }, [selectedNodeId]);

  // Delete selected connection
  const handleDeleteConnection = useCallback(() => {
    if (selectedConnectionId) {
      setConnections((prev) => prev.filter((c) => c.id !== selectedConnectionId));
      setSelectedConnectionId(null);
    }
  }, [selectedConnectionId]);

  // Run workflow
  const handleRunWorkflow = useCallback(() => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 3000);
  }, []);

  // Get connection positions for rendering
  const getConnectionPositions = (connection: Connection) => {
    const fromNode = nodes.find((n) => n.id === connection.from);
    const toNode = nodes.find((n) => n.id === connection.to);

    if (!fromNode || !toNode) {
      return { fromPos: { x: 0, y: 0 }, toPos: { x: 0, y: 0 } };
    }

    const fromPos = getPortPosition(
      fromNode.position,
      connection.fromPort as 'input' | 'output' | 'tool' | 'memory'
    );
    const toPos = getPortPosition(
      toNode.position,
      connection.toPort as 'input' | 'output' | 'tool' | 'memory'
    );

    return { fromPos, toPos };
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId) {
          handleDeleteNode();
        } else if (selectedConnectionId) {
          handleDeleteConnection();
        }
      }
      // Escape key
      if (e.key === 'Escape') {
        setSelectedNodeId(null);
        setSelectedConnectionId(null);
        setIsConfigPanelOpen(false);
        setIsNodePaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, selectedConnectionId, handleDeleteNode, handleDeleteConnection]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="h-screen flex flex-col bg-dark">
      {/* Header */}
      <Header
        workflowName="AI Agent Workflow"
        isActive={true}
        onSave={() => console.log('Save')}
      />

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Canvas */}
        <div ref={canvasRef} className="w-full h-full">
          <Canvas
            nodes={nodes}
            connections={connections}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            onNodeMove={(id, pos) => {
              setNodes((prev) =>
                prev.map((n) => (n.id === id ? { ...n, position: pos } : n))
              );
            }}
            onConnectionStart={() => {}}
            onConnectionEnd={() => {}}
            tempConnection={tempLine}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          >
            {/* Render connections */}
            {connections.map((connection) => {
              const { fromPos, toPos } = getConnectionPositions(connection);
              return (
                <ConnectionLine
                  key={connection.id}
                  connection={connection}
                  fromPos={fromPos}
                  toPos={toPos}
                  isSelected={selectedConnectionId === connection.id}
                  isAnimating={isExecuting}
                  label={connection.label}
                  onClick={() => {
                    setSelectedConnectionId(connection.id);
                    setSelectedNodeId(null);
                  }}
                />
              );
            })}

            {/* Render nodes */}
            {nodes.map((node) => (
              <div key={node.id} data-node-id={node.id}>
                <CanvasNode
                  data={node}
                  isSelected={selectedNodeId === node.id}
                  isRunning={isExecuting}
                  onClick={() => handleNodeClick(node.id)}
                  onDragStart={(e, nodeId) => startNodeDrag(e, nodeId, node.position)}
                  onPortMouseDown={handlePortMouseDown}
                  onPortMouseUp={handlePortMouseUp}
                />
              </div>
            ))}
          </Canvas>
        </div>

        {/* Config Panel */}
        {isConfigPanelOpen && selectedNode && (
          <ConfigPanel
            isOpen={isConfigPanelOpen}
            onClose={() => {
              setIsConfigPanelOpen(false);
              setSelectedNodeId(null);
            }}
            nodeData={{
              title: selectedNode.title,
              subtitle: selectedNode.subtitle || '',
            }}
          />
        )}

        {/* Bottom Toolbar */}
        <BottomToolbar
          onTest={handleRunWorkflow}
          onHideChat={() => setIsChatOpen(!isChatOpen)}
          onAddNode={() => setIsNodePaletteOpen(true)}
          onDelete={handleDeleteNode}
        />

        {/* Node Search Palette */}
        <NodeSearchPalette
          isOpen={isNodePaletteOpen}
          onClose={() => setIsNodePaletteOpen(false)}
          onSelectNode={handleAddNode}
        />
      </div>
    </div>
  );
};
