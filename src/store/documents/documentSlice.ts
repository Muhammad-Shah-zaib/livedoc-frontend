import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocumentState } from "./types";
import {
  getDocumentByShareTokenThunk,
  getDocumentsThunk,
  patchDocumentThunk,
  postDocumentThunk,
  requestAccessThunk,
} from "./documentThunk";
import { toast } from "sonner";

// --------------------
// Initial State
// --------------------
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
  canNavigateToDetailFromConnect: false,
};

// --------------------
// Slice
// --------------------
const documentSlice = createSlice({
  initialState,
  name: "documents",
  reducers: {
    // Set app initialization state
    setIsAppInitialized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAppInitialized = payload;
    },
    // Set search query for filtering documents
    setSerachQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    // Set the current document
    setCurrentDocument: (
      state,
      { payload }: PayloadAction<DocumentState["currentDocument"]>
    ) => {
      state.currentDocument = payload;
    },
    // Set navigation flag for connect dialog
    setCanNavigateToDetailFromConnect: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.canNavigateToDetailFromConnect = payload;
    },
  },
  extraReducers: (builder) => {
    // --------------------
    // Get Documents
    // --------------------
    builder
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

      // --------------------
      // Post Document
      // --------------------
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
          can_write_access: (payload as any).can_write_access ?? false,
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

      // --------------------
      // Patch Document
      // --------------------
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
        if (state.currentDocument && state.currentDocument.id == payload.id) {
          state.currentDocument = payload;
        }
        state.error = null;
        state.generalError = null;
      })
      .addCase(patchDocumentThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError = payload?.message || "Unable to update Document";
      })

      // --------------------
      // Request Access
      // --------------------
      .addCase(requestAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(requestAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        toast.success(payload.detail);
      })
      .addCase(requestAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        toast.error(payload?.message || "Request access failed");
      })

      // --------------------
      // Get Document by Share Token
      // --------------------
      .addCase(getDocumentByShareTokenThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
        state.currentDocument = null;
        state.canNavigateToDetailFromConnect = false;
      })
      .addCase(getDocumentByShareTokenThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        state.currentDocument = payload;
        state.canNavigateToDetailFromConnect = true;
      })
      .addCase(getDocumentByShareTokenThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError = payload?.message || "Unable to fetch document";
        state.currentDocument = null;
        state.canNavigateToDetailFromConnect = false;
      });
  },
});

// --------------------
// Exports
// --------------------
export const {
  setCanNavigateToDetailFromConnect,
  setIsAppInitialized,
  setSerachQuery,
  setCurrentDocument,
} = documentSlice.actions;
export default documentSlice.reducer;
