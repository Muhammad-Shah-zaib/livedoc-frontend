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
} from "./types";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";

const GET_DOCUMENTS_ACTION = "documents/getDocuments";
const POST_DOCUMENTS_ACTION = "documents/postDocument";
const PATCH_DOCUMENT_ACTION = "documents/patchDocument";
const REQUEST_ACCESS_ACTION = "documents/requestAccess";
const GET_DOCUMENT_BY_SHARE_TOKEN_ACTION = "documents/getDocumentByShareToken";

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
      API_ROUTES.DOCUMENTS.REQUEST_ACCESS(payload.share_token),
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
