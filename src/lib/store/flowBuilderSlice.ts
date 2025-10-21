import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FlowNode, flowState, TextNodeData } from "../types/flowBuilder";
import type { Connection, Edge } from "@xyflow/react";

const initialState: flowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const flowBuilderSlice = createSlice({
  name: "flowBuilder",
  initialState,
  reducers: {
    addNode: (state: flowState, action: PayloadAction<FlowNode>) => {
      state.nodes.push(action.payload);
    },
    updateNodeData: (
      state: flowState,
      action: PayloadAction<{ id: string; data: Partial<TextNodeData> }>
    ) => {
      const { id, data } = action.payload;
      const node = state.nodes.find((n) => n.id === id);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },
    setNodes: (state: flowState, action: PayloadAction<FlowNode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state: flowState, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    onConnect: (state: flowState, action: PayloadAction<Connection>) => {
      const { source, target } = action.payload;

      state.edges = state.edges.filter((edge) => edge.source !== source);

      state.edges.push({
        id: `${source}-${target}`,
        source,
        target,
        type: "smoothstep",
      });
    },
    deleteNode: (state: flowState, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.edges = state.edges.filter(
        (edge) =>
          edge.source !== action.payload && edge.target !== action.payload
      );

      if (state.selectedNodeId === action.payload) {
        state.selectedNodeId = null;
      }
    },
    selectNode: (state: flowState, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    resetFlow: (state: flowState) => {
      state.selectedNodeId = null;
      state.nodes = initialState.nodes;
      state.edges = initialState.edges;
    },
  },
});

export const {
  addNode,
  updateNodeData,
  setNodes,
  setEdges,
  onConnect,
  deleteNode,
  selectNode,
  resetFlow,
} = flowBuilderSlice.actions;

export default flowBuilderSlice.reducer;
