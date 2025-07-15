import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocumentState } from "./types";
import { getDocumentsThunk } from "./documentThunk";

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
  generalError: null,
  initialDocumentFetch: false,
  isAppInitialized: false,
};

const documentSlice = createSlice({
  initialState,
  name: "documents",
  reducers: {
    setIsAppInitialized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAppInitialized = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get documents
      .addCase(getDocumentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(getDocumentsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.documents = payload;
        state.error = null;
        state.generalError = null;
        state.initialDocumentFetch = true;
      })
      .addCase(getDocumentsThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.documents = [];
        state.error = payload?.erros || null;
        state.generalError = payload?.message || null;
        state.initialDocumentFetch = true;
      });
  },
});

export const { setIsAppInitialized } = documentSlice.actions;
export default documentSlice.reducer;
