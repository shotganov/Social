import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import type { User } from "../types/User";

const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");

const preloadedUser: User = userString
  ? JSON.parse(userString)
  : {
      id: null,
      username: "Test",
      avatar: "",
      bio: "",
    };

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      token,
      user: preloadedUser,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
