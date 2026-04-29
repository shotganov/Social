import { useState } from "react";
import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import { PostComponent } from "./PostComponent";
import SocialIcon from "../../public/icon-social.svg";
import SendIcon from "../../public/icon-send.svg?react";
import type { User } from "../types/User";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import type { Post } from "../types/Post";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
};

type Comment = {
  id: number;
  user: User;
  content: string;
};

const commentsMock: Comment[] = [
  {
    id: 1,
    user: {
      id: 2,
      username: "Alex Smith",
      tag: "alex.smith",
      avatar: SocialIcon,
      bio: "",
    },
    content: "Отличный пост, интересно почитать продолжение.",
  },
  {
    id: 2,
    user: {
      id: 3,
      username: "Maria Doe",
      tag: "maria.doe",
      avatar: SocialIcon,
      bio: "",
    },
    content: "Согласна, выглядит очень круто.",
  },
];

export const ModalWindowPostComments = ({ setIsEdit, post }: Props) => {
  const [comments, setComments] = useState<Comment[]>(commentsMock);
  const [commentText, setCommentText] = useState("");

  useLockBodyScroll();

  const handleSendComment = () => {
    const content = commentText.trim();

    if (!content) {
      return;
    }

    setComments((currentComments) => [
      {
        id: Date.now(),
        user: {
          id: 1,
          username: "John Doe",
          tag: "john.doe",
          avatar: SocialIcon,
          bio: "",
        },
        content,
      },
      ...currentComments,
    ]);
    setCommentText("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        zIndex: 10,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: 5.7,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsEdit(false);
      }}
    >
      <Box
        sx={{
          width: 600,
          maxWidth: "100vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          p: 1.5,
          pt: 2,
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.18)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            pb: 1.5,
          }}
        >
          <ButtonBase onClick={() => setIsEdit(false)} sx={cancelBtnSx}>
            Закрыть
          </ButtonBase>

          <Box sx={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
            Пост
          </Box>

          <Box sx={{ width: 79 }} />
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            mx: -1.5,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <PostComponent post={post} embedded commentsDisabled />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 2,
              alignItems: "center",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
            }}
          >
            <Box
              component="img"
              src={SocialIcon}
              alt=""
              sx={{ width: 44, height: 44, flexShrink: 0 }}
            />

            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                px: 1.5,
                py: 1,
                borderRadius: 3,
                border: "1px solid #dbe4f0",
                backgroundColor: "#f8fafc",
                transition:
                  "background-color 180ms ease, border-color 180ms ease",
                "&:focus-within": {
                  backgroundColor: "#eef2f7",
                  borderColor: "#c6d2e1",
                },
              }}
            >
              <InputBase
                multiline
                maxRows={5}
                value={commentText}
                placeholder="Написать комментарий..."
                onChange={(event) => setCommentText(event.target.value)}
                sx={{
                  flex: 1,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "#0f172a",
                }}
              />

              {commentText.length > 0 && (
                <ButtonBase
                  type="button"
                  onClick={handleSendComment}
                  sx={sendBtnSx}
                >
                  <SendIcon width={20} height={20} />
                </ButtonBase>
              )}
            </Paper>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, px: 2 }}
          >
            {comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              >
                <Box
                  component="img"
                  src={comment.user.avatar}
                  alt=""
                  sx={{ width: 44, height: 44, flexShrink: 0 }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Box sx={{ fontSize: 15, fontWeight: 500, lineHeight: 1.25 }}>
                    {comment.user.username}
                  </Box>
                  <Box
                    sx={{
                      mt: 0.5,
                      fontSize: 15,
                      lineHeight: 1.45,
                      color: "#334765",
                    }}
                  >
                    {comment.content}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const actionBtnSx = {
  fontSize: "14px",
  height: 35,
  px: 1.5,
  borderRadius: 3,
  transition: "0.2s ease",
};

const cancelBtnSx = {
  ...actionBtnSx,
  border: "1px solid #dbe4f0",
  backgroundColor: "#f8fafc",
  color: "#334765",
  "&:hover": { backgroundColor: "#eef2f7" },
};

const sendBtnSx = {
  width: "36px",
  height: "30px",
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
};
