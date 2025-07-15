import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetDocumentsResponse,
  ErrorResponse,
  PostDocumentsResponse,
  PostDocumentsPayload,
  PatchDocumentPayload,
  PatchDocumentResponse,
} from "./types";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";

const GET_DOCUMENTS_ACTION = "documents/getDocuments";
const POST_DOCUMENTS_ACTION = "documents/postDocument";
const PATCH_DOCUMENT_ACTION = "documents/patchDocument";

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
