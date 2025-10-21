import { MessageSquare } from "lucide-react";
import type { DragEvent } from "react";

const nodeTemplates = [
  {
    type: "textNode",
    icon: MessageSquare,
    label: "Message",
    description: "Send a text message",
    color: "from-blue-500 to-indigo-600",
  },
];

const Sidebar = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("text/plain", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-72 border-r bg-[hsl(var(--card))] p-4 flex flex-col gap-4 overflow-y-auto shadow-inner">
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">
          Nodes Panel
        </h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Drag to add nodes
        </p>
      </div>

      <div className="space-y-3">
        {nodeTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => onDragStart(e, template.type)}
              className="w-full p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:bg-[hsl(val(--accent))]/5 hover:border-blue-500 transition-all duration-200 cursor-grab active:cursor-grabbing group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-blue-600 transition-colors">
                    {template.label}
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="p-3 rounded-lg bg-[hsl(var(--muted))]/50">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            💡 <span className="font-medium">Tip:</span> Drag nodes to canvas,
            click to edit
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
