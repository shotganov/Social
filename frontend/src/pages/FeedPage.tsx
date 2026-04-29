import { useState } from "react";
import { Box, ButtonBase, Paper } from "@mui/material";
import { CreatePost } from "../components/CreatePost";
import { PostComponent } from "../components/PostComponent";
import SocialIcon from "../../public/icon-social.svg";
import PostImage from "../../public/profile-background.jpg";
import type { Post } from "../types/Post";
import type { User } from "../types/User";

type FeedMode = "forYou" | "following";

const user: User = {
  id: 1,
  tag: "john.doe",
  username: "John Doe",
  avatar: SocialIcon,
  bio: "",
};

const posts: Post[] = [
  {
    id: 1,
    user,
    content: "Пост с одной фотографией.",
    likes: 5,
    comments: 11,
    images: ["../../public/testImg/5.png"],
  },
  {
    id: 2,
    user,
    content: "Пост с двумя фотографиями.",
    likes: 12,
    comments: 3,
    images: ["../../public/testImg/1.png", "../../public/testImg/5.png"],
  },
  {
    id: 3,
    user,
    content: "Пост с тремя фотографиями.",
    likes: 9,
    comments: 6,
    images: [
      "../../public/testImg/1.png",
      "../../public/testImg/2.png",
      "../../public/testImg/3.png",
    ],
  },
  {
    id: 4,
    user,
    content: "Пост с четырьмя фотографиями.",
    likes: 24,
    comments: 8,
    images: [
      "../../public/testImg/1.png",
      "../../public/testImg/2.png",
      "../../public/testImg/3.png",
      "../../public/testImg/4.png",
    ],
  },
  {
    id: 5,
    user,
    content: "Обычный пост без фотографий.",
    likes: 2,
    comments: 1,
  },
];

export const FeedPage = () => {
  const [feedMode, setFeedMode] = useState<FeedMode>("forYou");

  const tabs = [
    { label: "Обзор", value: "forYou" as const, width: 45 },
    { label: "Подписки", value: "following" as const, width: 74 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pb: 1 }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#f8fafc",
          pt: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: "16px 16px 0 0",
            border: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {tabs.map((tab, index) => {
            const active = feedMode === tab.value;
            const textWidth = tabs[index].width ?? 0;

            return (
              <ButtonBase
                key={tab.value}
                onClick={() => setFeedMode(tab.value)}
                sx={{
                  position: "relative",
                  width: "50%",
                  height: 56,
                  fontSize: 16,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#0f172a" : "#64748b",
                  transition: "background-color 180ms ease, color 180ms ease",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                  },
                  "&::after": {
                    content: '""',
                    left: "50%",
                    transform: "translateX(-50%)",
                    position: "absolute",
                    width: active ? textWidth : 0,
                    bottom: 0,
                    height: 3,
                    borderRadius: "999px",
                    backgroundColor: active ? "#2563ff" : "transparent",
                  },
                }}
              >
                {tab.label}
              </ButtonBase>
            );
          })}
        </Paper>
      </Box>

      <CreatePost />

      <Box>
        {feedMode === "forYou" ? (
          posts.map((post) => <PostComponent key={post.id} post={post} />)
        ) : (
          <PostComponent post={posts[0]} />
        )}
      </Box>
    </Box>
  );
};
