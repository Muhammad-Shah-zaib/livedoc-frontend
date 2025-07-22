import type { SettingsState, SettingsCategory } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingsState = {
  drawerMode: false,
  activeCategory: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsDrawerMode: (state, action: PayloadAction<boolean>) => {
      state.drawerMode = action.payload;
    },
    setSettingsActiveCategory: (
      state,
      action: PayloadAction<SettingsCategory>
    ) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setSettingsDrawerMode, setSettingsActiveCategory } =
  settingsSlice.actions;
export default settingsSlice.reducer;
