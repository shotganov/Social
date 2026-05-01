import { Box } from "@mui/material";

export const EmptyDialog = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#334765",
      fontSize: 18,
      border: "1px solid #e2e8f0",
      borderRadius: "0px 16px 16px 0px",
      "@media (max-width: 1100px)": {
        display: "none",
      },
    }}
  >
    Выберите чат
  </Box>
);
