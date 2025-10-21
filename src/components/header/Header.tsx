import { Bot, Play, RotateCcw, Save } from "lucide-react";
import { Button } from "../../elements/button/Button";
import { useAppDispatch } from "../../lib/hooks/useAppDispatch";
import { resetFlow } from "../../lib/store/flowBuilderSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import { setCurrentNode, togglePreview } from "../../lib/store/chatSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);

  const handleReset = () => {
    dispatch(resetFlow());
    toast.success("Flow has been reset.");
  };

  const handleSave = () => {
    if (nodes.length > 1) {
      const nodesWithoutIncoming = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
      );
      if (nodesWithoutIncoming.length > 1) {
        toast.error("Cannot save flow: Multiple starting nodes detected.");
        return;
      }
      toast.success("Flow saved successfully.");
    }
  };

  const handlePreview = () => {
    if (nodes.length === 0) {
      toast.error("Cannot preview an empty flow.");
      return;
    }
    const startNode =
      nodes.find((n) => !edges.some((e) => e.target === n.id)) || nodes[0];
    dispatch(setCurrentNode(startNode.id ? startNode.id : ""));

    setTimeout(() => {
      dispatch(togglePreview());
    }, 0);
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[0.75rem] bg-gradient-primary flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            Chatbot Flow Builder
          </h1>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Design your conversational flows
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button
          size="sm"
          onClick={handlePreview}
          className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4" />
          Preview
        </Button>
      </div>
    </header>
  );
};
export default Header;
