import { useEffect, useState, type ChangeEvent } from "react";
import { useAppDispatch } from "../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import {
  deleteNode,
  selectNode,
  updateNodeData,
} from "../../lib/store/flowBuilderSlice";
import { toast } from "react-toastify";
import { Button } from "../../elements/button/Button";
import { Trash2, X } from "lucide-react";
import { Textarea } from "../../elements/textarea/Textarea";
import { Label } from "../../elements/label/Label";

const SettingPanel = () => {
  const selectedNodeId = useAppSelector((state) => state.flow.selectedNodeId);
  const nodes = useAppSelector((state) => state.flow.nodes);
  const dispatch = useAppDispatch();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);
  const [localMessage, setMessage] = useState("");
  useEffect(() => {
    if (selectedNode) {
      setMessage(selectedNode.data.message || "");
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  const handleSave = () => {
    dispatch(
      updateNodeData({ id: selectedNode.id, data: { message: localMessage } })
    );
    toast.success("Node updated successfully.");
  };

  const handleDelete = () => {
    dispatch(deleteNode(selectedNode.id));
    toast.success("Node deleted successfully.");
  };
  const handleClose = () => {
    dispatch(selectNode(null));
  };
  return (
    <aside className="w-80 border-l border-gray-200 bg-white flex flex-col shadow-lg animate-slide-in-right">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[hsl(222,47%,11%)]">
          Settings Panel
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message" size="sm" variant="muted">
            Text
          </Label>
          <Textarea
            id="message"
            value={localMessage}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            placeholder="Enter message text..."
            className="min-h-32 resize-none"
          />
        </div>
      </div>

      <div className="p-4 border-t space-y-2">
        <Button onClick={handleSave} className="w-full">
          Save
        </Button>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="w-full text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Node
        </Button>
      </div>
    </aside>
  );
};

export default SettingPanel;
