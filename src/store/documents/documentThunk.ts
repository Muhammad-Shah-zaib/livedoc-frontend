import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetDocumentsResponse, ErrorResponse } from "./types";
import axios from "axios";
import { API_ROUTES } from "@/environment/apiRoutes";

const GET_DOCUMENTS_ACTION = "documents/getDocuments";

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
