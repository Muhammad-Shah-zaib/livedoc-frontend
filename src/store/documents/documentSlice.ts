import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AvailableTabsInDocumentAccess,
  Document,
  DocumentAccess,
  DocumentState,
} from "./types";
import {
  getDocumentByShareTokenThunk,
  getDocumentsThunk,
  patchDocumentThunk,
  postDocumentThunk,
  requestAccessThunk,
  getAllDocumentAccessThunk,
  getSingleDocumentAccessThunk,
  approveAccessThunk,
  revokeAccessThunk,
  deleteDocumentThunk,
  grantAccessThunk,
  checkLiveDocumentAccessThunk,
  deleteDocumentAccessThunk,
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
  documentAccess: [],
  documentViewStyle: "grid",
  canConnectToDocument: false,
  deleteSuccessful: false,
  accessDocumentDetail: false,
  activeTabInDocumentAccess: "requests",
  editorViewOnlyMode: false,
};

// --------------------
// Slice
// --------------------
const documentSlice = createSlice({
  initialState,
  name: "documents",
  reducers: {
    // Set app initialization state
    setEditorViewOnlyMode: (state, { payload }: PayloadAction<boolean>) => {
      state.editorViewOnlyMode = payload;
    },
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
    setCurrentDocumentWritePermission: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      if (state.currentDocument)
        state.currentDocument.can_write_access = payload;
    },
    findAndSetDocumentWriteAccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        documentId: number;
        canWriteAccess: boolean;
      }>
    ) => {
      const { documentId, canWriteAccess } = payload;
      const docIndex = state.documents.findIndex(
        (doc) => doc.id === documentId
      );
      if (docIndex !== -1) {
        state.documents[docIndex].can_write_access = canWriteAccess;
      }
      // Also update currentDocument if it matches
      if (state.currentDocument && state.currentDocument.id === documentId) {
        state.currentDocument.can_write_access = canWriteAccess;
      }
    },
    setCurrentDocumentLiveMembers: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      if (state.currentDocument)
        state.currentDocument.live_members_count = payload;
    },
    // Set navigation flag for connect dialog
    setCanNavigateToDetailFromConnect: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.canNavigateToDetailFromConnect = payload;
    },
    setDocumentViewStyle: (
      state,
      { payload }: PayloadAction<"grid" | "list">
    ) => {
      state.documentViewStyle = payload;
    },
    setDeleteSuccessful: (state, { payload }: PayloadAction<boolean>) => {
      state.deleteSuccessful = payload;
    },
    setAccessDocumentDetail: (state, { payload }: PayloadAction<boolean>) => {
      state.accessDocumentDetail = payload;
    },
    toggleAccessDocumentDetail: (state) => {
      state.accessDocumentDetail = !state.accessDocumentDetail;
    },
    setActiveTabInDocumentAccess: (
      state,
      { payload }: PayloadAction<AvailableTabsInDocumentAccess>
    ) => {
      state.activeTabInDocumentAccess = payload;
    },
    setDocumentDetail: (state, { payload }: PayloadAction<Document>) => {
      const index = state.documents.findIndex((doc) => doc.id === payload.id);
      if (index !== -1) {
        state.documents[index] = {
          ...state.documents[index],
          ...payload, // merge existing and new data
        };
      }
      if (state.currentDocument && state.currentDocument.id === payload.id) {
        state.currentDocument = {
          ...state.currentDocument,
          ...payload, // merge existing and new data
        };
      }
    },
    addOrUpdateDocumentAccess: (
      state,
      { payload }: PayloadAction<DocumentAccess>
    ) => {
      const index = state.documentAccess.findIndex((a) => a.id === payload.id);
      if (index !== -1) {
        state.documentAccess[index] = payload; // Update existing access
      } else {
        state.documentAccess.push(payload); // Add new access
      }
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
      // Approve Access
      // --------------------
      .addCase(approveAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(approveAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        state.documentAccess = state.documentAccess.map((da) => {
          if (da.id == payload.access.id) {
            da = payload.access;
          }
          return da;
        });
        toast.success(payload.detail);
      })
      .addCase(approveAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        toast.error(payload?.message || "Approve access failed");
      })

      // --------------------
      // Revoke Access
      // --------------------
      .addCase(revokeAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(revokeAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        state.documentAccess = state.documentAccess.map((da) => {
          if (da.id == payload.access.id) {
            da = payload.access;
          }
          return da;
        });
        toast.success(payload.detail);
      })
      .addCase(revokeAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        toast.error(payload?.message || "Revoke access failed");
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
      })

      // --------------------
      // Get All Document Access
      // --------------------
      .addCase(getAllDocumentAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(getAllDocumentAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.documentAccess = payload;
        state.error = null;
        state.generalError = null;
      })
      .addCase(getAllDocumentAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.documentAccess = [];
        state.error = payload?.erros || null;
        state.generalError =
          payload?.message || "Unable to fetch document access list";
      })

      // --------------------
      // Get Single Document Access
      // --------------------
      .addCase(getSingleDocumentAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(getSingleDocumentAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Replace or add the single access in documentAccess array
        const index = state.documentAccess.findIndex(
          (access) => access.id === payload.id
        );
        if (index !== -1) {
          state.documentAccess[index] = payload;
        } else {
          state.documentAccess.push(payload);
        }
        state.error = null;
        state.generalError = null;
      })
      .addCase(getSingleDocumentAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError =
          payload?.message || "Unable to fetch single document access";
      })

      // --------------------
      // Delete Document
      // --------------------
      .addCase(deleteDocumentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(deleteDocumentThunk.fulfilled, (state, { payload, meta }) => {
        state.loading = false;
        state.documents = state.documents.filter(
          (doc) => doc.id !== meta.arg.id
        );
        state.filteredDocuments = state.filteredDocuments.filter(
          (doc) => doc.id !== meta.arg.id
        );
        if (state.currentDocument && state.currentDocument.id === meta.arg.id) {
          state.currentDocument = null;
        }
        state.error = null;
        state.generalError = null;
        toast.success(payload.detail);

        state.deleteSuccessful = true;
      })
      .addCase(deleteDocumentThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError = payload?.message || "Unable to delete Document";
      })

      // --------------------
      // Grant Access
      // --------------------
      .addCase(grantAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(grantAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Add or update the access in documentAccess array
        const index = state.documentAccess.findIndex(
          (access) => access.id === payload.access.id
        );
        if (index !== -1) {
          state.documentAccess[index] = payload.access;
        } else {
          state.documentAccess.push(payload.access);
        }
        state.error = null;
        state.generalError = null;
        toast.success(payload.detail);
      })
      .addCase(grantAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.erros || null;
        state.generalError = payload?.message || "Unable to grant access";
        toast.error(payload?.message || "Grant access failed");
      })

      // --------------------
      // Check Live Document Access
      // --------------------
      .addCase(checkLiveDocumentAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
        state.canConnectToDocument = false;
      })
      .addCase(checkLiveDocumentAccessThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;
        state.canConnectToDocument = payload.status === "CAN_CONNECT";
      })
      .addCase(checkLiveDocumentAccessThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.generalError =
          payload?.message || "Unable to check live document access";
        state.canConnectToDocument = false;
        toast.error(state.generalError);
      })
      // --------------------
      // DELTE Document Access
      // --------------------
      .addCase(deleteDocumentAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generalError = null;
      })
      .addCase(deleteDocumentAccessThunk.fulfilled, (state, { meta }) => {
        state.loading = false;
        state.error = null;
        state.generalError = null;

        // remove the access from documentAccess array
        state.documentAccess = state.documentAccess.filter(
          (access) => access.id !== meta.arg.access_id
        );
        toast.success(`Access request deleted successfully`);
      })
      .addCase(deleteDocumentAccessThunk.rejected, (state) => {
        state.loading = false;
        state.error = null;
        state.generalError = "Unable to delete access request";
        toast.success(`Access request deleted successfully`);
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
  setDocumentViewStyle,
  setDeleteSuccessful,
  setAccessDocumentDetail,
  toggleAccessDocumentDetail,
  setActiveTabInDocumentAccess,
  setDocumentDetail,
  addOrUpdateDocumentAccess,
  setEditorViewOnlyMode,
  setCurrentDocumentWritePermission,
  setCurrentDocumentLiveMembers,
  findAndSetDocumentWriteAccess,
} = documentSlice.actions;
export default documentSlice.reducer;
