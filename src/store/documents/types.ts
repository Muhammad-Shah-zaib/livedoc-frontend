import type { IUser } from "../auth/types";

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
  canNavigateToDetailFromConnect: boolean;
  documentAccess: DocumentAccess[];
}

export interface DocumentAccess {
  id: number;
  user: IUser;
  document: Document;
  can_edit: boolean;
  access_requested: boolean;
  access_approved: boolean;
  request_at: string;
  approved_at: string;
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
  can_write_access: boolean;
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

// REQEUST ACCESS
export interface RequestAccessPayload {
  share_token: string;
}

export interface RequestAccessResponse {
  detail: string;
}

// GET REQUEST BY SHARE TOKEN
export interface GetDocumentByShareTokenResponse extends Document {}

export interface GetDocuemntByShareTokenPayload {
  share_token: string;
}

export type GetAllDocumentAccessResponse = DocumentAccess[];

export interface GetSingleDocumentAccessPayload {
  id: number;
  // filter fields
  docuemnt?: number;
  access_requested?: boolean;
  access_approved?: boolean;
}

export interface GetSingleDocumentAccessResponse extends DocumentAccess {}
