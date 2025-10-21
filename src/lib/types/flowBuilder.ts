import type { Edge, Node, NodeTypes } from "@xyflow/react";
import { TextNode } from "../../components/flow-builder/nodes/TextNode";

export interface TextNodeData extends Record<string, unknown> {
  message: string;
}

export type FlowNode = Node<TextNodeData>;

export interface flowState {
  nodes: FlowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
}

export const nodeTypes: NodeTypes = {
  textNode: TextNode,
};
