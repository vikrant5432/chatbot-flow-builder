export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  currentNodeId: string;
  isActive: boolean;
}
