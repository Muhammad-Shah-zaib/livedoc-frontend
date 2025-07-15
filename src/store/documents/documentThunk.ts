import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetDocumentsResponse,
  ErrorResponse,
  PostDocumentsResponse,
  PostDocumentsPayload,
} from "./types";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";
import { TypeOutline } from "lucide-react";

const GET_DOCUMENTS_ACTION = "documents/getDocuments";
const POST_DOCUMENTS_ACTION = "documents/postDocument";

export const getDocumentsThunk = createAsyncThunk<
  GetDocumentsResponse,
  void,
  { rejectValue: ErrorResponse }
>(GET_DOCUMENTS_ACTION, async (_, thunkAPI) => {
  try {
    const response = await axios.get<GetDocumentsResponse>(
      API_ROUTES.DOCUMENTS.GET,
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
      API_ROUTES.DOCUMENTS.POST,
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
