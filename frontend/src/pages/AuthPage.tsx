import { useEffect, useState } from "react";
import "../styles/auth-component.css";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/selectors";
import type { Auth } from "../types/Auth";
import { useLogin, useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token]);

  function handleChangeMode() {
    setError("");

    if (mode === "login") setMode("register");
    else setMode("login");

    setForm({
      username: "",
      password: "",
      confirmPassword: "",
    });
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode === "register" && form.password !== form.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    } else if (mode === "register") {
      const auth: Auth = {
        username: form.username,
        password: form.password,
      };
      registerMutation.mutate(auth);
    }

    if (mode === "login" && form.password && form.username) {
      const auth: Auth = {
        username: form.username,
        password: form.password,
      };

      loginMutation.mutate(auth);
    }
  }

  return (
    <div className="content">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="header">
          <div className="icon">
            <img src="./icon-social.svg" alt="" />
          </div>
          <h1>{mode === "login" ? "Вход в Social" : "Регистрация в Social"}</h1>
        </div>

        <input
          type="text"
          placeholder="Логин"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {mode === "register" && (
          <input
            type="password"
            placeholder="Повторите пароль"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        )}

        {error && <p className="error">Пароли не совпадают</p>}

        <button type="submit" className="auth-btn">
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </button>

        <p>
          Нет аккаунта?{" "}
          <button type="button" className="stateBtn" onClick={handleChangeMode}>
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </form>
    </div>
  );
};
