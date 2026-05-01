import { Box, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import SocialIcon from "@shared/assets/icons/icon-social.svg?react";
import { colors, radius } from "@shared/styles";
import { CreatePostModal } from "./CreatePostModal";

export const CreatePost = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
    <Box
      sx={{
        background: colors.surface,
        display: "flex",
        flexDirection: "column",

        border: `1px solid ${colors.border}`,
        borderTop: "0px",
        p: 2,
        borderRadius: "0px 0px 16px 16px",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <Box sx={{ flexShrink: 0 }}>
          <SocialIcon width={48} height={48} />
        </Box>

        <Paper
          elevation={0}
          sx={{
            px: 1.75,
            py: 1.25,
            width: "100%",
            borderRadius: radius.md,
            border: `1px solid ${colors.inputBorder}`,
            backgroundColor: colors.inputBg,
          }}
        >
          <InputBase
            placeholder={"Написать пост..."}
            onFocus={() => setIsCreatePostModalOpen(true)}
          />
        </Paper>
      </Box>

      {isCreatePostModalOpen && (
        <CreatePostModal setIsEdit={setIsCreatePostModalOpen} />
      )}
    </Box>
  );
};
