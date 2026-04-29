import { useMutation } from "@tanstack/react-query";
import type { Auth } from "../types/Auth";
import { api } from "../services/axios";
import { useAppDispatch } from "../store/hooks";
import { setToken, setUser } from "../store/authSlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (auth: Auth) =>
      api.post("/auth/login", auth).then((res) => res.data),
    onSuccess: (data) => {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setUser(data.user));
    },
  });
};

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (auth: Auth) =>
      api.post("/auth/register", auth).then((res) => res.data),
    onSuccess: (data) => {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setUser(data.user));
    },
  });
};
