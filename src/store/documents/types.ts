export interface DocumentState {
  documents: Document[];
  filteredDocuments: Document[];
  currentDocument: Document | null;
  loading: boolean;
  error: Record<string, string[]> | null;
  generalError: string | null;
  initialDocumentFetch: boolean;
  isAppInitialized: boolean;
  isGridView: boolean;
  searchQuery: string;
}

export interface Document {
  id: number;
  live_members_count: number;
  name: string;
  content: string;
  is_live: boolean;
  share_token: string;
  created_at: string;
  updated_at: string;
  admin: number;
}

// ERROR RESPOSNE
export interface ErrorResponse {
  message: string;
  erros?: Record<string, string[]> | null;
}

// GET DOCUMENTS
export type GetDocumentsResponse = Document[]; // no payload required since http cookies has already been set

// POST DOCUMENTS
export interface PostDocumentsPayload {
  name: string;
}

export interface PostDocumentsResponse {
  id: number;
  name: string | string[];
  content: string;
  is_live: boolean;
  share_token: string;
  created_at: string;
  updated_at: string;
  admin: number;
}

// PATCH
export interface PatchDocumentPayload {
  id: number;
  name?: string;
  content?: string;
  is_live?: boolean;
}
export interface PatchDocumentResponse extends Document {}
