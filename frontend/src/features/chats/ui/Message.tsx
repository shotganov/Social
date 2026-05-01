import { Box } from "@mui/material";
import { colors } from "@shared/styles";

type Props = {
  message: string;
};

export const Message = ({ message }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "fit-content",
          p: 1.5,
          backgroundColor: colors.comment,
          maxWidth: "400px",
          ml: "auto",
          borderRadius: 4,
          color: "white",
          wordBreak: "break-word",
        }}
      >
        {message}
      </Box>
    </Box>
  );
};
