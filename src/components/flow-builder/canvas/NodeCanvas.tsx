import { useCallback, useRef, type DragEvent, type MouseEvent } from "react";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";
import type {
  ReactFlowInstance,
  OnNodesChange,
  OnEdgesChange,
  NodeChange,
  EdgeChange,
  Edge,
  Connection,
  NodeMouseHandler,
} from "@xyflow/react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import {
  deleteNode,
  setEdges,
  setNodes,
  onConnect as onConnectAction,
  selectNode,
} from "../../../lib/store/flowBuilderSlice";
import { nodeTypes, type FlowNode } from "../../../lib/types/flowBuilder";

export const NodeCanvas = () => {
  const dispatch = useAppDispatch();
  const flowNodes = useAppSelector((state) => state.flow.nodes);
  const flowEdges = useAppSelector((state) => state.flow.edges);
  const reactFlowInstance = useRef<ReactFlowInstance<FlowNode> | null>(null);

  const handleNodesChange: OnNodesChange<FlowNode> = useCallback(
    (changes: NodeChange<FlowNode>[]) => {
      if (!Array.isArray(changes) || changes.length === 0) return;
      const upgradeNodes = changes.reduce<FlowNode[]>((acc, change) => {
        if (change.type === "position" && change.position) {
          return acc.map((node) =>
            node.id === change.id
              ? { ...node, position: change.position! }
              : node
          );
        }
        if (change.type === "remove") {
          dispatch(deleteNode(change.id));
          return acc;
        }
        return acc;
      }, flowNodes);
      dispatch(setNodes(upgradeNodes));
    },
    [dispatch, flowNodes]
  );

  const handleEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      const updatedEdges = changes.reduce((acc, change) => {
        if (change.type === "remove") {
          return acc.filter((edge) => edge.id !== change.id);
        }
        return acc;
      }, flowEdges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, flowEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => dispatch(onConnectAction(connection)),
    [dispatch]
  );
  const handleNodeClick = useCallback<NodeMouseHandler<FlowNode>>(
    (_: MouseEvent, node: FlowNode) => {
      dispatch(selectNode(node.id));
    },
    [dispatch]
  );

  const handlePanelClick = useCallback(() => {
    dispatch(selectNode(null));
  }, [dispatch]);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer?.getData("application/reactflow");

      if (!type || reactFlowInstance.current === null) {
        return;
      }

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: FlowNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { message: "New Node" },
      };

      dispatch(setNodes([...flowNodes, newNode]));
    },
    [dispatch, flowNodes]
  );

  const onInit = useCallback((instance: ReactFlowInstance<FlowNode>) => {
    reactFlowInstance.current = instance;
  }, []);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "move";
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePanelClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={onInit}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[16, 16]}
        fitView
        className="bg-[hsl(var(--background))]"
      >
        <Background className="!bg-[hsl(var(--muted))]" gap={20} />
        <Controls className="bg-[hsl(0,0%,100%)] border border-[hsl(var(--border))] rounded-lg" />
        <MiniMap
          className="bg-[hsl(0,0%,100%)] border border-[hsl(var(--border))] rounded-lg "
          nodeColor={() => "#a068ed"}
        />
      </ReactFlow>
    </div>
  );
};
