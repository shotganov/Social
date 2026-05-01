import { Box } from "@mui/material";

type PostHeaderProps = {
  username: string;
  tag: string;
};

export const PostHeader = ({ username, tag }: PostHeaderProps) => (
  <Box
    sx={{ display: "flex", gap: 1, alignItems: "center", textAlign: "center" }}
  >
    <Box
      sx={{
        fontSize: 15,
        fontWeight: 500,
      }}
    >
      {username}
    </Box>
    <Box sx={{ fontSize: 15, color: "#a2a7aa", textAlign: "center" }}>
      @{tag}
    </Box>
  </Box>
);
