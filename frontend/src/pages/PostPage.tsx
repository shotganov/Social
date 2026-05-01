import { useState } from "react";
import { Box, ButtonBase, InputBase, Paper } from "@mui/material";
import { PostComponent, defaultPost } from "@entities/post";
import { PostActions } from "@features/posts";
import SocialIcon from "@public/icon-social.svg";
import BackIcon from "@public/icon-back.svg?react";
import type { User } from "@shared/model";
import { useNavigate } from "react-router-dom";
import { colors, transitions } from "@shared/styles";

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
    content: "Отличный пост! Очень понравилось.",
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

export const PostPage = () => {
  const [comments, setCommets] = useState<Comment[]>(commentsMock);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  const handleSendComment = () => {
    const content = commentText.trim();

    if (!content) return;

    setCommets([
      {
        id: Date.now(),
        user: {
          id: 1,
          username: "John Doe",
          tag: "john.doe",
          avatar: SocialIcon,
          bio: "",
        },
        content: content,
      },
      ...comments,
    ]);
  };

  const handleNavigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pb: 2 }}>
      <Box
        sx={{
          mt: 1,
          borderRadius: 4,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.surface,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            p: 1,
            pl: 2.7,
            fontSize: "20px",
            borderBottom: `1px solid ${colors.border}`,
            fontWeight: "700",
          }}
        >
          <ButtonBase
            onClick={handleNavigateBack}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              color: colors.textMuted,
              transition: transitions.backgroundAndColor,
              "&:hover": {
                color: colors.text,
                backgroundColor: colors.inputFocusBg,
              },
            }}
          >
            <Box
              component={BackIcon}
              sx={{
                width: 24,
                height: 24,
                color: "inherit",
              }}
            />
          </ButtonBase>
          <Box>Пост</Box>
        </Box>

        <PostComponent
          embedded
          post={defaultPost}
          actions={
            <PostActions
              likes={defaultPost.likes}
              comments={defaultPost.comments}
              showReport={false}
            />
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            // borderRadius: 4,
            alignItems: "center",
            borderTop: `1px solid ${colors.border}`,
            backgroundColor: colors.surface,
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
              alignItems: "flex-end",
              gap: 1,
              width: "100%",
              px: 1.75,
              py: 1,
              borderRadius: 3,
              border: `1px solid ${colors.inputBorder}`,
              backgroundColor: colors.inputBg,
            }}
          >
            <InputBase
              multiline
              maxRows={6}
              value={commentText}
              placeholder="Написать комментарий..."
              onChange={(event) => setCommentText(event.target.value)}
              sx={{
                flex: 1,
                fontSize: 15,
                lineHeight: 1.5,
                color: colors.text,
              }}
            />

            <ButtonBase
              onClick={handleSendComment}
              disabled={!commentText.trim()}
              sx={{
                px: 1.5,
                py: 0.875,
                borderRadius: 2.5,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.2,
                color: colors.surface,
                backgroundColor: colors.iconMuted,
                transition: transitions.backgroundAndBorder,
                "&:hover": {
                  backgroundColor: colors.accentHover,
                },
                "&.Mui-disabled": {
                  color: colors.surface,
                  opacity: 0.45,
                },
              }}
            >
              Отправить
            </ButtonBase>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1.5 }}>
        {comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 2,
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.surface,
            }}
          >
            <Box
              component="img"
              src={comment.user.avatar}
              alt=""
              sx={{ width: 44, height: 44, flexShrink: 0 }}
            />

            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25 }}>
                {comment.user.username}
              </Box>
              <Box
                sx={{
                  mt: 0.5,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: colors.textSoft,
                }}
              >
                {comment.content}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
