import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../lib/hooks/useAppSelector";
import {
  addMessage,
  resetChat,
  setCurrentNode,
  togglePreview,
} from "../../lib/store/chatSlice";
import type { TextNodeData } from "../../lib/types/flowBuilder";
import { Button } from "../../elements/button/Button";
import { RotateCcw, Send, X } from "lucide-react";

const ChatInterface = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const currentNodeId = useAppSelector((state) => state.chat.currentNodeId);
  const isActive = useAppSelector((state) => state.chat.isActive);
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState("");

  const currentNode = nodes.find((node) => node.id === currentNodeId);

  useEffect(() => {
    if (isActive && currentNode && messages.length === 0) {
      const messageText =
        (currentNode.data as TextNodeData).message || "Hello!";

      setTimeout(() => {
        dispatch(
          addMessage({
            id: `msg-${Date.now()}`,
            type: "bot",
            content: messageText,
            timestamp: Date.now(),
          })
        );
      }, 200);
    }
  }, [isActive, currentNode, dispatch, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    dispatch(
      addMessage({
        id: `msg-${Date.now()}`,
        type: "user",
        content: userInput.trim(),
        timestamp: Date.now(),
      })
    );

    const nextEdge = edges.find((edge) => edge.source === currentNodeId);
    if (nextEdge) {
      const nextNode = nodes.find((node) => node.id === nextEdge.target);
      if (nextNode) {
        dispatch(setCurrentNode(nextNode.id));
        setTimeout(() => {
          const messageText =
            (nextNode.data as TextNodeData).message || "Hello!";
          dispatch(
            addMessage({
              id: `msg-${Date.now()}`,
              type: "bot",
              content: messageText,
              timestamp: Date.now(),
            })
          );
        }, 500);
      }
    }
    setUserInput("");
  };

  const handleReset = () => {
    dispatch(resetChat());
    if (nodes.length > 0) {
      const startNode =
        nodes.find((n) => !edges.some((e) => e.target === n.id)) || nodes[0];
      dispatch(setCurrentNode(startNode.id));
    }
  };

  const handleClose = () => {
    dispatch(togglePreview());
    dispatch(resetChat());
  };

  if (!isActive) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-[hsl(var(--card))] border-2 border-[hsl(var(--border))] rounded-2xl shadow-lg flex flex-col animate-scale-in overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Chat Preview</h3>
            <p className="text-xs text-white/80">Testing your flow</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 ${
                msg.type === "user"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-lg border bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button size="sm" onClick={handleSendMessage} className="gap-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 text-center">
          Chat follows your connected nodes
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
