import axios from "axios";
import { API_BASE_URL } from "@shared/config";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || "Request error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};
