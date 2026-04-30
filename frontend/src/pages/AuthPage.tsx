import { type FormEvent, useEffect, useState } from "react";
import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AtIcon from "../../public/icon-at.svg?react";
import LockIcon from "../../public/icon-lock.svg?react";
import { useLogin, useRegister } from "../hooks/useAuth";
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/selectors";
import type { Auth } from "../types/Auth";

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

  const isRegister = mode === "register";
  const activeMutation = isRegister ? registerMutation : loginMutation;
  const isPending = loginMutation.isPending || registerMutation.isPending;
  const title = isRegister ? "Регистрация" : "Войти";
  const subtitle = isRegister
    ? "Создайте аккаунт и начните общение"
    : "Введите псевдоним и пароль";
  const submitText = isRegister ? "Зарегистрироваться" : "Войти";

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [navigate, token]);

  function handleChangeMode() {
    setError("");
    loginMutation.reset();
    registerMutation.reset();
    setMode(isRegister ? "login" : "register");
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password) {
      setError("Введите логин и пароль");
      return;
    }

    if (isRegister && form.password !== form.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    const auth: Auth = {
      username: form.username.trim(),
      password: form.password,
    };

    activeMutation.mutate(auth, {
      onError: () => {
        setError(
          isRegister
            ? "Не удалось зарегистрироваться"
            : "Не удалось войти в аккаунт",
        );
      },
    });
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(320px, 0.55fr) 1fr" },
        backgroundColor: "#ffffff",
        color: "#0f172a",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          px: 5,
          pb: 8,
          borderRight: "1px solid #e2e8f0",
          borderBottom: "none",
          textAlign: "right",
        }}
      >
        <Box
          sx={{
            fontSize: { sm: 44, lg: 50 },
            lineHeight: 1,
            fontWeight: 700,
            color: "#2563ff",
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            mt: 1.5,
            fontSize: { xs: 17, md: 19 },
            fontWeight: 700,
            color: "#334765",
          }}
        >
          {subtitle}
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: { xs: "auto", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          px: { xs: 2, sm: 5 },
        }}
      >
        <Paper
          component="form"
          elevation={0}
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 0,
            border: "none",
            borderRadius: 0,
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              textAlign: "center",
              flexDirection: "column",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box
              sx={{
                fontSize: 40,
                lineHeight: 1,
                fontWeight: 700,
                color: "#2563ff",
              }}
            >
              {title}
            </Box>
            <Box
              sx={{
                fontSize: 17,
                fontWeight: 700,
                color: "#334765",
              }}
            >
              {subtitle}
            </Box>
          </Box>

          <Box>
            <Box sx={labelSx}>Учетная запись</Box>
            <InputBase
              type="text"
              placeholder="Логин"
              value={form.username}
              disabled={isPending}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              startAdornment={<AtIcon style={inputIconStyle} />}
              sx={inputSx}
            />
          </Box>

          <Box>
            <InputBase
              type="password"
              placeholder="Пароль"
              value={form.password}
              disabled={isPending}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              startAdornment={<LockIcon style={inputIconStyle} />}
              sx={inputSx}
            />
          </Box>

          {isRegister && (
            <Box>
              <InputBase
                type="password"
                placeholder="Пароль еще раз"
                value={form.confirmPassword}
                disabled={isPending}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                startAdornment={<LockIcon style={inputIconStyle} />}
                sx={inputSx}
              />
            </Box>
          )}

          {error && (
            <Box sx={{ fontSize: 15, fontWeight: 700, color: "#dc2626" }}>
              {error}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <ButtonBase
              type="button"
              disabled={isPending}
              onClick={handleChangeMode}
              sx={secondaryButtonSx}
            >
              {isRegister ? "Войти" : "Регистрация"}
            </ButtonBase>

            <ButtonBase type="submit" disabled={isPending} sx={submitButtonSx}>
              {isPending ? "Подождите..." : submitText}
            </ButtonBase>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const labelSx = {
  mb: 0.75,
  fontSize: 15,
  fontWeight: 700,
  color: "#64748b",
} as const;

const inputSx = {
  width: "100%",
  minHeight: 48,
  px: 1.25,
  gap: 1,
  borderRadius: 3,
  border: "1px solid transparent",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: 16,
  transition: "background-color 180ms ease",
  "& input": {
    p: 0,
    "&::placeholder": {
      color: "#64748b",
      opacity: 1,
    },
  },
  "&:focus-within": {
    backgroundColor: "#eef2f7",
  },
  "&.Mui-disabled": {
    opacity: 0.65,
  },
} as const;

const inputIconStyle = {
  width: 22,
  height: 22,
  flexShrink: 0,
};

const submitButtonSx = {
  minHeight: 48,
  px: 3,
  borderRadius: 999,
  backgroundColor: "#2563ff",
  color: "#ffffff",
  fontSize: 16,
  fontWeight: 700,
  transition: "background-color 180ms ease, opacity 180ms ease",
  "&:hover": {
    backgroundColor: "#1d4ed8",
  },
  "&.Mui-disabled": {
    opacity: 0.65,
    color: "#ffffff",
  },
} as const;

const secondaryButtonSx = {
  minHeight: 48,
  px: 3,
  borderRadius: 999,
  backgroundColor: "#f8fafc",
  color: "#334765",
  fontSize: 16,
  fontWeight: 700,
  transition: "background-color 180ms ease, opacity 180ms ease",
  "&:hover": {
    backgroundColor: "#eef2f7",
  },
  "&.Mui-disabled": {
    opacity: 0.65,
    color: "#64748b",
  },
} as const;

const modeButtonSx = (muted: boolean) =>
  ({
    minHeight: 56,
    px: 4,
    flex: { xs: 1, md: "initial" },
    borderRadius: 999,
    backgroundColor: muted ? "#f8fafc" : "#2563ff",
    color: muted ? "#334765" : "#ffffff",
    fontSize: 16,
    fontWeight: 700,
    transition: "background-color 180ms ease",
    "&:hover": {
      backgroundColor: muted ? "#eef2f7" : "#1d4ed8",
    },
  }) as const;
