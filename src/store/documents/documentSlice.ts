import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocumentState } from "./types";
import {
  getDocumentsThunk,
  patchDocumentThunk,
  postDocumentThunk,
} from "./documentThunk";

const initialState: DocumentState = {
  documents: [],
  filteredDocuments: [],
  loading: false,
  error: null,
  generalError: null,
  initialDocumentFetch: false,
  isAppInitialized: false,
  isGridView: true,
  searchQuery: "",
  currentDocument: null,
};

const documentSlice = createSlice({
  initialState,
  name: "documents",
  reducers: {
    setIsAppInitialized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAppInitialized = payload;
    },
    setSerachQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setCurrentDocument: (
      state,
      { payload }: PayloadAction<DocumentState["currentDocument"]>
    ) => {
      state.currentDocument = payload;
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
        state.filteredDocuments = payload;
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
      })
      // postDOcument
      .addCase(postDocumentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(postDocumentThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Ensure payload is shaped as Document
        const newDoc = {
          id: payload.id,
          live_members_count: 1, // default to 1, adjust if needed
          name: typeof payload.name === "string" ? payload.name : "",
          content: payload.content,
          is_live: payload.is_live,
          share_token: payload.share_token,
          created_at: payload.created_at,
          updated_at: payload.updated_at,
          admin: payload.admin,
        };
        state.documents.push(newDoc);
        state.filteredDocuments.push(newDoc);
        state.searchQuery = "";
        state.error = null;
        state.generalError = null;
      })
      .addCase(postDocumentThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = {
          name: payload?.message ? [payload.message] : [],
        };
        state.generalError = "Unable to create new Document";
      })
      // patch request
      .addCase(patchDocumentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(patchDocumentThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Update the document in both documents and filteredDocuments
        const index = state.documents.findIndex((doc) => doc.id === payload.id);
        if (index !== -1) {
          state.documents[index] = payload;
          state.filteredDocuments[index] = payload;
        }
        state.error = null;
        state.generalError = null;
      })
      .addCase(patchDocumentThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError = payload?.message || "Unable to update Document";
      });
  },
});

export const { setIsAppInitialized, setSerachQuery, setCurrentDocument } =
  documentSlice.actions;
export default documentSlice.reducer;
