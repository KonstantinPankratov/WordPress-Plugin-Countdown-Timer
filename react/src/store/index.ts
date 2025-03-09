import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";

const store = configureStore({
  reducer: {
    countdownConfig: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;