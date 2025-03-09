import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountdownConfig, CountdownConfigSchema } from "../types/schemas/config.s";

const initialState: CountdownConfig = CountdownConfigSchema.parse({});

const configSlice = createSlice({
  name: "countdownConfig",
  initialState,
  reducers: {
    updateSetting: <K extends keyof CountdownConfig>(
      state: CountdownConfig,
      action: PayloadAction<{ key: K; value: CountdownConfig[K] }>
    ) => {
      const newState = { ...state, [action.payload.key]: action.payload.value };
      const parsedState = CountdownConfigSchema.safeParse(newState);

      if (parsedState.success) {
        return parsedState.data;
      } else {
        console.error("Invalid state update:", parsedState.error.errors);
        return state;
      }
    },
    mergeConfig: (state: CountdownConfig, action: PayloadAction<Partial<CountdownConfig>>) => {
      return CountdownConfigSchema.parse({
        ...state,
        ...action.payload,
      })
    },
    resetConfig: () => initialState,
  },
});

export const { updateSetting, mergeConfig, resetConfig } = configSlice.actions;

export default configSlice.reducer;