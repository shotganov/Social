import { Box, InputBase, Paper, TextareaAutosize } from "@mui/material";
import SocialIcon from "../../public/icon-social.svg?react";
import { useState } from "react";
import { CreatePostModalWindow } from "./CreatePostModalWindow";
import { selectUser } from "../store/selectors";
import { useAppSelector } from "../store/hooks";

export const CreatePost = () => {
  const user = useAppSelector(selectUser);
  const [isModalWindowActive, setIsModalWindowActive] = useState(false);

  return (
    <Box
      sx={{
        background: "white",
        display: "flex",
        flexDirection: "column",

        border: "1px solid #e2e8f0",
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
            borderRadius: 3,
            border: "1px solid #dbe4f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <InputBase
            placeholder={"Написать пост..."}
            onFocus={() => setIsModalWindowActive(true)}
          />
        </Paper>
      </Box>

      {isModalWindowActive && (
        <CreatePostModalWindow
          setIsEdit={setIsModalWindowActive}
        ></CreatePostModalWindow>
      )}
    </Box>
  );
};
