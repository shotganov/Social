import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
