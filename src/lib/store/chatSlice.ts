import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage, ChatState } from "../types/chat";

const initialState: ChatState = {
  messages: [],
  currentNodeId: "start-node",
  isActive: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setCurrentNode: (state, action: PayloadAction<string>) => {
      state.currentNodeId = action.payload;
    },
    startChat: (state) => {
      state.isActive = true;
      state.messages = [];
      state.currentNodeId = "start-node";
    },
    togglePreview: (state) => {
      state.isActive = !state.isActive;
      if (state.isActive) {
        state.messages = [];
      }
    },
    resetChat: (state) => {
      state.messages = [];
      state.currentNodeId = "start-node";
    },
  },
});

export const {
  addMessage,
  setCurrentNode,
  startChat,
  togglePreview,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
