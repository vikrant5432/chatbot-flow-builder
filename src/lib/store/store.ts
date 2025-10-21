import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./flowBuilderSlice";
import ChatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
    chat: ChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
