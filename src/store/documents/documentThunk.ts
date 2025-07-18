import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type GetDocumentsResponse,
  type ErrorResponse,
  type PostDocumentsResponse,
  type PostDocumentsPayload,
  type PatchDocumentPayload,
  type PatchDocumentResponse,
  type RequestAccessPayload,
  type RequestAccessResponse,
  type GetDocumentByShareTokenResponse,
  type GetDocuemntByShareTokenPayload,
  type GetAllDocumentAccessResponse,
  type GetSingleDocumentAccessPayload,
  type GetSingleDocumentAccessResponse,
  type RevokeApproveAccessPayload,
  type RevokeApproveAccessResponse,
  type DeleteDocuemntPayload,
  type DeleteDocumentResponse,
  type GrantAccessPayload,
  type GrantAccessResponse,
} from "./types";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";

const GET_DOCUMENTS_ACTION = "documents/getDocuments";
const POST_DOCUMENTS_ACTION = "documents/postDocument";
const PATCH_DOCUMENT_ACTION = "documents/patchDocument";
const REQUEST_ACCESS_ACTION = "documents/requestAccess";
const APPROVE_ACCESS_ACTION = "documents/approveAccess";
const REVOKE_ACCESS_ACTION = "documents/revokeAccess";
const GET_DOCUMENT_BY_SHARE_TOKEN_ACTION = "documents/getDocumentByShareToken";
const GET_ALL_DOCUMENT_ACCESS_ACTION = "documents/getAllDocumentAccess";
const GET_SINGLE_DOCUMENT_ACCESS_ACTION = "documents/getSingleDocumentAccess";
const DELETE_DOCUMENT_ACTION = "documents/deleteDocument";
const GRANT_ACCESS_ACTION = "documents/grantAccess";

export const getDocumentsThunk = createAsyncThunk<
  GetDocumentsResponse,
  void,
  { rejectValue: ErrorResponse }
>(GET_DOCUMENTS_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.get<GetDocumentsResponse>(
      API_ROUTES.DOCUMENTS.GET_POST,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Failed to fetch documents";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error || error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const postDocumentThunk = createAsyncThunk<
  PostDocumentsResponse,
  PostDocumentsPayload,
  { rejectValue: ErrorResponse }
>(POST_DOCUMENTS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post<PostDocumentsResponse>(
      API_ROUTES.DOCUMENTS.GET_POST,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Failed to create document";

    if (axios.isAxiosError(error)) {
      // Check for 400 Bad Request and possible validation errors
      if (error.response?.status === 400) {
        message = error.response?.data?.name?.[0] ?? "This field is required"; // since there is only one field required
      }
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

// patch request
export const patchDocumentThunk = createAsyncThunk<
  PatchDocumentResponse,
  PatchDocumentPayload,
  { rejectValue: ErrorResponse }
>(PATCH_DOCUMENT_ACTION, async (payload) => {
  try {
    const response = await axios.patch(
      API_ROUTES.DOCUMENTS.PATCH_PUT_DETAIL(payload.id),
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Failed to update document";

    return { message };
  }
});

// request access
export const requestAccessThunk = createAsyncThunk<
  RequestAccessResponse,
  RequestAccessPayload,
  { rejectValue: ErrorResponse }
>(REQUEST_ACCESS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post<RequestAccessResponse>(
      API_ROUTES.DOCUMENT_ACCESS.REQUEST_ACCESS(payload.share_token),
      null,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Request access failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const approveAccessThunk = createAsyncThunk<
  RevokeApproveAccessResponse,
  RevokeApproveAccessPayload,
  { rejectValue: ErrorResponse }
>(APPROVE_ACCESS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.patch(
      API_ROUTES.DOCUMENT_ACCESS.APPROVE_ACCESS(payload.access_id),
      null,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Approve access failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const revokeAccessThunk = createAsyncThunk<
  RevokeApproveAccessResponse,
  RevokeApproveAccessPayload,
  { rejectValue: ErrorResponse }
>(REVOKE_ACCESS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.patch(
      API_ROUTES.DOCUMENT_ACCESS.REVOKE_ACCESS(payload.access_id),
      null,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let message = "Revoke access failed";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

// get document by shraetoken
export const getDocumentByShareTokenThunk = createAsyncThunk<
  GetDocumentByShareTokenResponse,
  GetDocuemntByShareTokenPayload,
  { rejectValue: ErrorResponse }
>(GET_DOCUMENT_BY_SHARE_TOKEN_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.get<GetDocumentByShareTokenResponse>(
      API_ROUTES.DOCUMENTS.GET_DETAIL_BY_SHARE_TOKEN(payload.share_token),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to fetch document by share token";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }

    return thunkAPI.rejectWithValue({ message });
  }
});

export const getAllDocumentAccessThunk = createAsyncThunk<
  GetAllDocumentAccessResponse,
  void,
  { rejectValue: ErrorResponse }
>(GET_ALL_DOCUMENT_ACCESS_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.get<GetAllDocumentAccessResponse>(
      API_ROUTES.DOCUMENT_ACCESS.GET_POST,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to fetch document access list";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const getSingleDocumentAccessThunk = createAsyncThunk<
  GetSingleDocumentAccessResponse,
  GetSingleDocumentAccessPayload,
  { rejectValue: ErrorResponse }
>(GET_SINGLE_DOCUMENT_ACCESS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.get<GetSingleDocumentAccessResponse>(
      API_ROUTES.DOCUMENT_ACCESS.PATCH_PUT_DELETE(payload.id),
      {
        params: {
          ...(payload.docuemnt !== undefined && { docuemnt: payload.docuemnt }),
          ...(payload.access_requested !== undefined && {
            access_requested: payload.access_requested,
          }),
          ...(payload.access_approved !== undefined && {
            access_approved: payload.access_approved,
          }),
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to fetch single document access";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const deleteDocumentThunk = createAsyncThunk<
  DeleteDocumentResponse,
  DeleteDocuemntPayload,
  { rejectValue: ErrorResponse }
>(DELETE_DOCUMENT_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.delete<DeleteDocumentResponse>(
      API_ROUTES.DOCUMENTS.PATCH_PUT_DETAIL(payload.id),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    let message = "Failed to delete document";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});

export const grantAccessThunk = createAsyncThunk<
  GrantAccessResponse,
  GrantAccessPayload,
  { rejectValue: ErrorResponse }
>(GRANT_ACCESS_ACTION, async (payload, thunkAPI) => {
  try {
    const response = await axios.post<GrantAccessResponse>(
      API_ROUTES.DOCUMENT_ACCESS.GRANT_ACCESS,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    let message = "Failed to grant access";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || message;
    }
    return thunkAPI.rejectWithValue({ message });
  }
});
