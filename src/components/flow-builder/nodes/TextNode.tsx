import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageSquare } from "lucide-react";
import type { FlowNode } from "../../../lib/types/flowBuilder";

export const TextNode = memo(({ data, selected }: NodeProps<FlowNode>) => {
  return (
    <div
      className={`w-56 rounded-lg border-2 bg-[hsl(0,0%,100%)] shadow-md transition-all ${
        selected ? "border-blue-500 shadow-lg" : "border-[hsl(var(--border))]"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 flex items-center gap-2 rounded-t-md">
        <MessageSquare className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white">Message</span>
      </div>

      <div className="p-4">
        <p className="text-sm text-[hsl(222,47%,11%)] leading-relaxed">
          {data.message || "Enter message..."}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
});

TextNode.displayName = "TextNode";
