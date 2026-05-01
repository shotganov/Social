export { PrivateRouter } from "./ui/PrivateRouter";
export { useLogin, useRegister } from "./hooks/useAuth";
export {
  default as authReducer,
  authSlice,
  setToken,
  clearToken,
} from "./model/authSlice";
export { selectToken } from "./model/selectors";
export type { Auth } from "./model/Auth";
