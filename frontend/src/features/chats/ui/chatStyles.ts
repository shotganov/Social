export const messageInputWrapSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1.5,
  py: 1,
  borderRadius: 3,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  transition: "background-color 180ms ease, border-color 180ms ease",
  "&:focus-within": {
    backgroundColor: "#eef2f7",
    borderColor: "#c6d2e1",
  },
} as const;

export const sendBtnSx = {
  width: 36,
  height: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 2.5,
  backgroundColor: "#8FA1BF",
  cursor: "pointer",
  transition: "0.2s ease",
  "&:hover": {
    backgroundColor: "#7C92B0",
  },
} as const;
