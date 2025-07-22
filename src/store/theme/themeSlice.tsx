import type { ThemeState } from "./types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initalState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initalState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
    applyTheme: (state) => {
      const body = document.querySelector("body");
      if (body) {
        if (state.mode === "dark") {
          body.classList.add("dark");
        } else {
          body.classList.remove("dark");
        }
      }
    },
    applyThemeInital: (state) => {
      const theme = localStorage.getItem("theme");
      const body = document.querySelector("body");
      if (body) {
        switch (theme) {
          case "dark":
            body.classList.add("dark");
            state.mode = "dark";
            break;
          case "light":
            body.classList.remove("dark");
            state.mode = "light";
            break;
          default:
            body.classList.add("dark");
            state.mode = "dark";
            break;
        }
      }
    },
  },
});

export const { setTheme, toggleTheme, applyTheme, applyThemeInital } =
  themeSlice.actions;
export default themeSlice.reducer;
